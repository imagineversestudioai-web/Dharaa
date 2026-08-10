/**
 * DHARAA Brand Guidelines — Word document generator
 * Source of truth: Dharaa_Brand_Profile.pdf + packaging concept system
 */
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, VerticalAlign, PageNumber,
  PageBreak, convertInchesToTwip,
} = require("docx");
const fs = require("fs");
const path = require("path");

// —— Brand tokens (from packaging concept + positioning) ——
const C = {
  forest: "1B4D3E",
  forestDeep: "0F3328",
  cream: "F7F1E3",
  creamDark: "EDE4D0",
  gold: "C9A227",
  goldDeep: "A6851A",
  ink: "2C2416",
  inkMuted: "5C5346",
  white: "FFFFFF",
  chili: "8B1E1E",
  coriander: "2F5D3A",
  garam: "5C3A1E",
  allInOne: "B8860B",
  border: "D4C9B0",
  lightGreen: "E8F0EB",
  lightGold: "FBF6E6",
  lightRed: "F8EAEA",
  lightBrown: "F3EDE6",
  success: "2D6A4F",
  error: "9B2335",
};

const PAGE_W = 11906; // A4
const PAGE_H = 16838;
const MARGIN = 720; // 0.5"
const CONTENT_W = PAGE_W - MARGIN * 2; // 10466

const thinBorder = { style: BorderStyle.SINGLE, size: 4, color: C.border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const borders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const goldLine = { style: BorderStyle.SINGLE, size: 12, color: C.gold };
const forestLine = { style: BorderStyle.SINGLE, size: 18, color: C.forest };

function cell(text, opts = {}) {
  const {
    width = 2616,
    fill = C.white,
    bold = false,
    color = C.ink,
    align = AlignmentType.LEFT,
    fontSize = 18,
    borders: b = borders,
    vAlign = VerticalAlign.CENTER,
    italics = false,
  } = opts;
  return new TableCell({
    borders: b,
    width: { size: width, type: WidthType.DXA },
    shading: { fill, type: ShadingType.CLEAR },
    verticalAlign: vAlign,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: [
      new Paragraph({
        alignment: align,
        children: [
          new TextRun({
            text,
            bold,
            italics,
            color,
            size: fontSize,
            font: "Arial",
          }),
        ],
      }),
    ],
  });
}

function multiCell(paragraphs, opts = {}) {
  const {
    width = 2616,
    fill = C.white,
    borders: b = borders,
    vAlign = VerticalAlign.TOP,
  } = opts;
  return new TableCell({
    borders: b,
    width: { size: width, type: WidthType.DXA },
    shading: { fill, type: ShadingType.CLEAR },
    verticalAlign: vAlign,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: paragraphs,
  });
}

function p(text, opts = {}) {
  const {
    size = 20,
    bold = false,
    color = C.ink,
    align = AlignmentType.LEFT,
    spacingBefore = 0,
    spacingAfter = 120,
    italics = false,
  } = opts;
  return new Paragraph({
    alignment: align,
    spacing: { before: spacingBefore, after: spacingAfter, line: 276 },
    children: [
      new TextRun({
        text,
        bold,
        italics,
        color,
        size,
        font: "Arial",
      }),
    ],
  });
}

function mixedP(runs, opts = {}) {
  const { align = AlignmentType.LEFT, spacingBefore = 0, spacingAfter = 120 } = opts;
  return new Paragraph({
    alignment: align,
    spacing: { before: spacingBefore, after: spacingAfter, line: 276 },
    children: runs.map((r) =>
      new TextRun({
        text: r.text,
        bold: r.bold || false,
        italics: r.italics || false,
        color: r.color || C.ink,
        size: r.size || 20,
        font: "Arial",
      })
    ),
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 0, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: C.gold, space: 8 } },
    children: [new TextRun({ text, bold: true, color: C.forest, size: 32, font: "Georgia" })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140 },
    children: [new TextRun({ text, bold: true, color: C.forestDeep, size: 26, font: "Georgia" })],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, color: C.forest, size: 22, font: "Arial" })],
  });
}

function bullet(text, ref = "bullets") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { before: 40, after: 40, line: 276 },
    children: [new TextRun({ text, size: 20, color: C.ink, font: "Arial" })],
  });
}

function bulletBoldLead(lead, rest, ref = "bullets") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { before: 40, after: 40, line: 276 },
    children: [
      new TextRun({ text: lead, bold: true, size: 20, color: C.ink, font: "Arial" }),
      new TextRun({ text: rest, size: 20, color: C.ink, font: "Arial" }),
    ],
  });
}

function spacer(after = 120) {
  return new Paragraph({ spacing: { after }, children: [] });
}

function colorSwatchRow(colors) {
  // colors: [{ name, hex, usage, fill }]
  const colW = Math.floor(CONTENT_W / colors.length);
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: colors.map(() => colW),
    rows: [
      new TableRow({
        children: colors.map((c) =>
          multiCell(
            [
              new Paragraph({
                spacing: { after: 60 },
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: " ", size: 36 })],
              }),
            ],
            { width: colW, fill: c.hex, borders }
          )
        ),
      }),
      new TableRow({
        children: colors.map((c) =>
          multiCell(
            [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: c.name, bold: true, size: 16, color: C.ink, font: "Arial" }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: `#${c.hex}`, size: 15, color: C.inkMuted, font: "Consolas" }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 20 },
                children: [
                  new TextRun({ text: c.usage, size: 14, color: C.inkMuted, font: "Arial", italics: true }),
                ],
              }),
            ],
            { width: colW, fill: C.cream, borders }
          )
        ),
      }),
    ],
  });
}

function simpleTable(headers, rows, colWidths) {
  const headerRow = new TableRow({
    children: headers.map((h, i) =>
      cell(h, {
        width: colWidths[i],
        fill: C.forest,
        bold: true,
        color: C.cream,
        fontSize: 17,
        align: AlignmentType.LEFT,
      })
    ),
  });
  const dataRows = rows.map((row, ri) =>
    new TableRow({
      children: row.map((val, i) =>
        cell(String(val), {
          width: colWidths[i],
          fill: ri % 2 === 0 ? C.white : C.cream,
          fontSize: 16,
          color: C.ink,
        })
      ),
    })
  );
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows],
  });
}

function sectionLabel(num, title) {
  return new Paragraph({
    spacing: { before: 0, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: C.gold, space: 10 } },
    children: [
      new TextRun({ text: `${num}  `, bold: true, color: C.gold, size: 28, font: "Georgia" }),
      new TextRun({ text: title, bold: true, color: C.forest, size: 28, font: "Georgia" }),
    ],
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 20, color: C.ink },
      },
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: "Georgia", color: C.forest },
        paragraph: { spacing: { before: 240, after: 200 }, outlineLevel: 0 },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 26, bold: true, font: "Georgia", color: C.forestDeep },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 },
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 22, bold: true, font: "Arial", color: C.forest },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "bullets2",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "bullets3",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "bullets4",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "bullets5",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "bullets6",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "bullets7",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "bullets8",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "dos",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "✓",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "donts",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "✗",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "numbers",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
    ],
  },
  sections: [
    // ===================== COVER =====================
    {
      properties: {
        page: {
          size: { width: PAGE_W, height: PAGE_H },
          margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
        },
      },
      children: [
        spacer(1600),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
          children: [
            new TextRun({ text: "◈", size: 48, color: C.gold, font: "Arial" }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: "DHARAA",
              bold: true,
              size: 72,
              color: C.forest,
              font: "Georgia",
              characterSpacing: 200,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: C.gold, space: 1 } },
          children: [
            new TextRun({
              text: "Rooted in Nature. Crafted for Taste.",
              italics: true,
              size: 22,
              color: C.inkMuted,
              font: "Georgia",
            }),
          ],
        }),
        spacer(200),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: "BRAND GUIDELINES",
              bold: true,
              size: 36,
              color: C.forestDeep,
              font: "Arial",
              characterSpacing: 120,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: "Visual Identity · Voice · Packaging · Application",
              size: 20,
              color: C.inkMuted,
              font: "Arial",
            }),
          ],
        }),
        spacer(600),
        new Table({
          width: { size: 5000, type: WidthType.DXA },
          columnWidths: [2500, 2500],
          rows: [
            new TableRow({
              children: [
                cell("Version", { width: 2500, fill: C.cream, bold: true, fontSize: 16, borders: noBorders }),
                cell("1.0", { width: 2500, fill: C.cream, fontSize: 16, borders: noBorders }),
              ],
            }),
            new TableRow({
              children: [
                cell("Date", { width: 2500, fill: C.cream, bold: true, fontSize: 16, borders: noBorders }),
                cell("August 2026", { width: 2500, fill: C.cream, fontSize: 16, borders: noBorders }),
              ],
            }),
            new TableRow({
              children: [
                cell("Classification", { width: 2500, fill: C.cream, bold: true, fontSize: 16, borders: noBorders }),
                cell("Internal & Partner Use", { width: 2500, fill: C.cream, fontSize: 16, borders: noBorders }),
              ],
            }),
            new TableRow({
              children: [
                cell("Market Focus", { width: 2500, fill: C.cream, bold: true, fontSize: 16, borders: noBorders }),
                cell("Hardoi → Uttar Pradesh → North India", { width: 2500, fill: C.cream, fontSize: 16, borders: noBorders }),
              ],
            }),
          ],
        }),
        spacer(1200),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Premium yet affordable Indian foods & spices",
              size: 18,
              color: C.inkMuted,
              font: "Arial",
              italics: true,
            }),
          ],
        }),
        pageBreak(),

        // ===================== TOC / QUICK REF =====================
        sectionLabel("00", "Quick Reference"),
        p("Use this page as a one-screen checklist for designers, printers, retailers, and agencies.", {
          color: C.inkMuted,
          italics: true,
          spacingAfter: 200,
        }),
        h3("Core Identity"),
        simpleTable(
          ["Element", "Specification"],
          [
            ["Brand name", "DHARAA (always all caps in logo lockup)"],
            ["Tagline", "Rooted in Nature. Crafted for Taste."],
            ["Primary color", "Forest Green  #1B4D3E"],
            ["Secondary color", "Warm Cream  #F7F1E3"],
            ["Accent color", "Heritage Gold  #C9A227"],
            ["Heading font", "Georgia / Playfair Display (serif)"],
            ["Body font", "Arial / Source Sans 3 (sans-serif)"],
            ["Hindi support", "Noto Sans Devanagari"],
            ["Voice traits", "Authentic · Warm · Trustworthy · Rooted · Premium-accessible"],
            ["Positioning", "Mid-premium spices: better than local, below national luxury"],
          ],
          [3200, 7266]
        ),
        spacer(200),
        h3("Document Contents"),
        bullet("01 — Brand Foundation (vision, positioning, values, portfolio)", "bullets"),
        bullet("02 — Color System (primary, product, neutrals, accessibility)", "bullets"),
        bullet("03 — Typography (typefaces, scale, bilingual rules)", "bullets"),
        bullet("04 — Logo System (variants, clear space, do/don't)", "bullets"),
        bullet("05 — Packaging Guidelines (structure, product colors, claims)", "bullets"),
        bullet("06 — Voice & Messaging (tone matrix, claims language)", "bullets"),
        bullet("07 — Imagery & Iconography", "bullets"),
        bullet("08 — Application (retail, digital, social, print)", "bullets"),
        bullet("09 — Brand Checklist & Version Control", "bullets"),
        pageBreak(),

        // ===================== 01 FOUNDATION =====================
        sectionLabel("01", "Brand Foundation"),
        h2("Brand Vision"),
        p(
          "Dharaa is a premium yet affordable Indian foods and spices brand rooted in nature, authenticity, and trust. We bring carefully sourced, hygienically processed, expertly blended spices to everyday Indian kitchens — starting in Hardoi and growing across Uttar Pradesh and neighboring states."
        ),
        h2("Tagline"),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 120, after: 80 },
          border: {
            top: { style: BorderStyle.SINGLE, size: 6, color: C.gold, space: 8 },
          },
          children: [],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 80 },
          shading: { fill: C.cream, type: ShadingType.CLEAR },
          children: [
            new TextRun({
              text: "Rooted in Nature. Crafted for Taste.",
              bold: true,
              italics: true,
              size: 28,
              color: C.forest,
              font: "Georgia",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 200 },
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 6, color: C.gold, space: 8 },
          },
          children: [],
        }),
        p(
          "Use the full tagline with the primary logo whenever space allows. On tight layouts (pouches under 100g face, social avatars), the wordmark alone is acceptable; restore the tagline in body or footer copy.",
          { size: 18, color: C.inkMuted, italics: true }
        ),

        h2("Positioning Statement"),
        p(
          "For households and cooks who want pure, consistent, hygienic spices without paying national premium-brand prices, Dharaa is the modern-classic spice brand that combines nature-rooted authenticity with mid-premium quality and regional trust."
        ),
        simpleTable(
          ["Dimension", "Dharaa Stance"],
          [
            ["Quality tier", "Mid-premium — higher than loose/local, accessible vs. national luxury"],
            ["Promise", "Purity, hygiene, consistent quality, regional trust"],
            ["Aesthetic", "Modern-classic: cream, forest green, gold accents"],
            ["Launch market", "Hardoi first → Uttar Pradesh → neighboring states"],
            ["Channels", "General trade, distributors, wholesale, modern retail, e-com, q-com"],
          ],
          [2800, 7666]
        ),

        h2("Brand Values"),
        simpleTable(
          ["Value", "Meaning in Practice"],
          [
            ["Purity", "No compromise on raw material quality; clean, honest ingredient stories"],
            ["Hygiene", "Hygienically processed and packed with care — visible in claims & icons"],
            ["Authenticity", "Traditional blends, regional taste memory, bilingual packaging"],
            ["Craft", "Expert blending for rich aroma and consistent flavour batch to batch"],
            ["Accessibility", "Premium feel at a fair price; pride without pretension"],
            ["Trust", "Family kitchens, retailer relationships, repeat purchase reliability"],
          ],
          [2800, 7666]
        ),

        h2("Brand Personality"),
        p("If Dharaa were a person: a trusted local spice merchant who upgraded to modern hygiene and design — warm, grounded, precise about quality, never flashy."),
        simpleTable(
          ["We are", "We are not"],
          [
            ["Warm & inviting", "Cold or corporate"],
            ["Rooted & natural", "Artificial or hyper-tech"],
            ["Premium-accessible", "Cheap-looking or elitist luxury"],
            ["Honest & clear", "Over-claiming or scientific jargon"],
            ["Family-trusted", "Youth-only trend brand"],
          ],
          [5233, 5233]
        ),

        h2("Launch Portfolio"),
        h3("Wave 1 — Core Four"),
        simpleTable(
          ["Product", "Net wt (launch)", "Role", "Header colour"],
          [
            ["Laal Mirchi Powder", "200g", "Hero colour & heat", "Deep Chili Red"],
            ["Dhaniya Masala", "100g", "Everyday staple", "Forest Green"],
            ["Garam Masala", "100g", "Signature blend", "Warm Brown"],
            ["All in One Masala", "100g", "Convenience hero", "Heritage Gold"],
          ],
          [2800, 2000, 2800, 2866]
        ),
        spacer(120),
        h3("Wave 2+ — Expansion"),
        p(
          "Turmeric, coriander, cumin, Kitchen King, Paneer masala, Chhole masala, Biryani masala, and other regional blends. Each new SKU inherits the master pouch system with a unique product colour band and hero ingredient photography.",
          { spacingAfter: 80 }
        ),
        pageBreak(),

        // ===================== 02 COLOR =====================
        sectionLabel("02", "Color System"),
        p(
          "Dharaa’s palette signals nature, purity, and mid-premium craft. Cream grounds the brand; forest green builds trust; gold elevates without luxury excess. Product header colours differentiate SKUs on shelf."
        ),

        h2("Primary Brand Palette"),
        colorSwatchRow([
          { name: "Forest Green", hex: C.forest, usage: "Logo, headers, trust" },
          { name: "Warm Cream", hex: C.cream, usage: "Backgrounds, packs" },
          { name: "Heritage Gold", hex: C.gold, usage: "Accent, emblem" },
          { name: "Deep Ink", hex: C.ink, usage: "Body text" },
        ]),
        spacer(160),
        simpleTable(
          ["Name", "Hex", "RGB", "CMYK (approx)", "Usage"],
          [
            ["Forest Green", "#1B4D3E", "27, 77, 62", "80, 30, 70, 40", "Primary brand, logo, CTAs, trust bars"],
            ["Forest Deep", "#0F3328", "15, 51, 40", "85, 40, 75, 55", "Dark text on cream, footer bars"],
            ["Warm Cream", "#F7F1E3", "247, 241, 227", "3, 4, 12, 0", "Pack faces, page backgrounds"],
            ["Cream Dark", "#EDE4D0", "237, 228, 208", "6, 8, 18, 0", "Secondary panels, cards"],
            ["Heritage Gold", "#C9A227", "201, 162, 39", "15, 30, 90, 5", "Emblem, dividers, premium cues"],
            ["Gold Deep", "#A6851A", "166, 133, 26", "25, 35, 95, 15", "Gold on light for small text"],
            ["Deep Ink", "#2C2416", "44, 36, 22", "50, 50, 70, 70", "Primary body text"],
            ["Ink Muted", "#5C5346", "92, 83, 70", "40, 35, 50, 30", "Captions, secondary copy"],
          ],
          [2000, 1400, 1600, 2200, 3266]
        ),

        h2("Product Accent Palette"),
        p("Each SKU owns a header/accent colour for shelf recognition. Never recolour the DHARAA wordmark with product accents — only the product colour band and related badges."),
        colorSwatchRow([
          { name: "Chili Red", hex: C.chili, usage: "Laal Mirchi" },
          { name: "Coriander", hex: C.coriander, usage: "Dhaniya" },
          { name: "Garam Brown", hex: C.garam, usage: "Garam Masala" },
          { name: "All-in-One Gold", hex: C.allInOne, usage: "All in One" },
        ]),
        spacer(120),
        simpleTable(
          ["SKU", "Accent Hex", "Accent name", "Notes"],
          [
            ["Laal Mirchi Powder", "#8B1E1E", "Deep Chili Red", "Pairs with red chilli photography"],
            ["Dhaniya Masala", "#2F5D3A", "Coriander Green", "Close to Forest; keep distinct"],
            ["Garam Masala", "#5C3A1E", "Warm Spice Brown", "Cinnamon/cardamom mood"],
            ["All in One Masala", "#B8860B", "Kitchen Gold", "Slightly deeper than brand gold"],
          ],
          [2800, 1800, 2600, 3266]
        ),

        h2("Approved Combinations"),
        simpleTable(
          ["Foreground", "Background", "Status"],
          [
            ["Forest Green / Deep Ink", "Warm Cream / White", "Primary — preferred"],
            ["Warm Cream / Gold", "Forest Green / Forest Deep", "Primary inverse"],
            ["Deep Ink", "Cream Dark / Light panels", "Body content"],
            ["Product accent", "Warm Cream (header band only)", "Packaging SKU ID"],
            ["Gold text (small)", "Forest Green", "OK for labels ≥ 10pt"],
            ["Gold text", "Warm Cream (large only)", "Large display only"],
            ["White body text", "Warm Cream", "Never — insufficient contrast"],
            ["Product red", "Forest Green large fill", "Avoid clashing large fields"],
          ],
          [3200, 4200, 3066]
        ),

        h2("Accessibility"),
        bullet("Body text on cream or white must meet WCAG 2.1 AA: minimum 4.5:1 contrast.", "bullets2"),
        bullet("Deep Ink (#2C2416) on Warm Cream (#F7F1E3) is the default readable pair.", "bullets2"),
        bullet("Forest Green buttons with cream or white label text must be verified before production.", "bullets2"),
        bullet("Never use Heritage Gold for body copy under 14pt on cream — contrast fails.", "bullets2"),
        bullet("FSSAI, veg symbol, and mandatory pack text follow statutory colour rules over brand preference.", "bullets2"),
        pageBreak(),

        // ===================== 03 TYPOGRAPHY =====================
        sectionLabel("03", "Typography"),
        p(
          "Typography balances modern-classic elegance (serif wordmark and titles) with everyday clarity (sans body). All consumer-facing packs and ads in Hindi markets use bilingual hierarchy: English primary product name + Devanagari secondary."
        ),

        h2("Typefaces"),
        simpleTable(
          ["Role", "Primary", "Fallback", "Notes"],
          [
            ["Brand wordmark", "Custom / Georgia Bold", "Times New Roman Bold", "Do not recreate logo in plain type"],
            ["Display / H1–H2", "Georgia / Playfair Display", "Times New Roman", "Headlines, pack product names"],
            ["UI & Body", "Arial / Source Sans 3", "Helvetica, sans-serif", "Web, docs, long copy"],
            ["Hindi / Devanagari", "Noto Sans Devanagari", "Mangal, Arial Unicode", "Pack secondary names, local ads"],
            ["Captions / labels", "Arial", "Helvetica", "Icons captions, fine print"],
            ["Technical / codes", "Consolas / Courier New", "monospace", "Hex codes, batch numbers only"],
          ],
          [2200, 2800, 2600, 2866]
        ),

        h2("Type Scale — Digital"),
        simpleTable(
          ["Role", "Font", "Weight", "Size", "Line height"],
          [
            ["Display", "Georgia", "Bold", "40–48px", "1.15"],
            ["H1", "Georgia", "Bold", "32–36px", "1.2"],
            ["H2", "Georgia", "SemiBold/Bold", "24–28px", "1.25"],
            ["H3", "Arial", "SemiBold", "18–20px", "1.3"],
            ["Body", "Arial", "Regular", "16px", "1.5–1.6"],
            ["Small / Caption", "Arial", "Regular", "12–13px", "1.4"],
            ["Button / CTA", "Arial", "SemiBold", "14–16px", "1.2"],
          ],
          [2200, 2200, 2000, 1800, 2266]
        ),

        h2("Type Scale — Print & Packaging"),
        simpleTable(
          ["Role", "Guidance"],
          [
            ["Brand wordmark on pouch", "Use approved artwork only; never type-set DHARAA"],
            ["Product name (EN)", "Bold serif or strong sans, high contrast on cream"],
            ["Product name (HI)", "Clear Devanagari, slightly smaller than English"],
            ["Descriptor line", "8–10pt readable; max 2 lines on front face"],
            ["Net weight", "Highly legible; statutory minimums apply"],
            ["Mandatory info (back)", "As per FSSAI / Legal Metrology — not stylised"],
          ],
          [3200, 7266]
        ),

        h2("Typography Rules"),
        bullet("Maximum two type families in any single layout (plus Devanagari when needed).", "bullets3"),
        bullet("Do not set long body copy in Georgia/Playfair — reserve serif for headlines and product names.", "bullets3"),
        bullet("Sentence case for marketing sentences; Title Case for product names on pack.", "bullets3"),
        bullet("Product names: English first (e.g., LAAL MIRCHI POWDER), Hindi second (लाल मिर्च पाउडर).", "bullets3"),
        bullet("Avoid all-caps for paragraphs; all-caps OK for short labels and the brand wordmark.", "bullets3"),
        bullet("Tracking: slightly open (+20 to +40) for large display; default for body.", "bullets3"),
        pageBreak(),

        // ===================== 04 LOGO =====================
        sectionLabel("04", "Logo System"),
        h2("Primary Lockup"),
        p(
          "The primary Dharaa lockup consists of: (1) the gold lotus/leaf emblem, (2) the DHARAA wordmark in deep forest/ink serif with gold accent on the final character where present in master art, and (3) the tagline centred beneath with fine gold rules."
        ),
        simpleTable(
          ["Element", "Specification"],
          [
            ["Emblem", "Gold multi-leaf / lotus mark above wordmark"],
            ["Wordmark", "DHARAA — custom lettering; do not substitute fonts"],
            ["Tagline", "Rooted in Nature. Crafted for Taste. — optional when space is tight"],
            ["Primary colourway", "Forest/ink wordmark + gold emblem on cream or white"],
            ["Inverse colourway", "Cream/white wordmark + gold emblem on forest green"],
            ["Monochrome", "Single colour: Forest Deep or Cream only"],
          ],
          [2800, 7666]
        ),

        h2("Variants"),
        simpleTable(
          ["Variant", "When to use"],
          [
            ["Primary horizontal", "Packaging headers, website header, stationery, POS"],
            ["Stacked (emblem + wordmark)", "Square formats, social profile fallbacks"],
            ["Emblem only", "Favicon, wax seals, embroidery, app icon (if developed)"],
            ["Wordmark only", "Very tight horizontal spaces; restore emblem nearby when possible"],
            ["With trust icons row", "Hero packaging banners and key visual ads"],
          ],
          [3200, 7266]
        ),

        h2("Clear Space & Minimum Size"),
        bullet("Clear space: minimum padding on all sides equal to the height of the emblem leaf unit.", "bullets4"),
        bullet("Digital minimum width: 120px for full lockup; 32px for emblem-only.", "bullets4"),
        bullet("Print minimum width: 30mm for full lockup; 8mm for emblem-only.", "bullets4"),
        bullet("Do not place competing logos, badges, or text inside the clear-space zone.", "bullets4"),

        h2("Logo Do’s"),
        new Paragraph({
          numbering: { reference: "dos", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "Use approved master files (SVG/PDF/PNG) only", size: 20, color: C.success, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "dos", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "Place on cream, white, or solid forest backgrounds", size: 20, color: C.success, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "dos", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "Maintain proportions; scale uniformly", size: 20, color: C.success, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "dos", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "Ensure contrast — use inverse lockup on dark green", size: 20, color: C.success, font: "Arial" })],
        }),

        h2("Logo Don’ts"),
        new Paragraph({
          numbering: { reference: "donts", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "Do not stretch, skew, rotate, or warp the logo", size: 20, color: C.error, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "donts", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "Do not recolour with product accents (chili red, garam brown, etc.)", size: 20, color: C.error, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "donts", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "Do not add drop shadows, glows, outlines, or 3D effects", size: 20, color: C.error, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "donts", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "Do not place on busy photos without a solid cream or green panel", size: 20, color: C.error, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "donts", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "Do not recreate the wordmark in a substitute font", size: 20, color: C.error, font: "Arial" })],
        }),
        new Paragraph({
          numbering: { reference: "donts", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "Do not crop the emblem or separate lockup elements inconsistently", size: 20, color: C.error, font: "Arial" })],
        }),
        pageBreak(),

        // ===================== 05 PACKAGING =====================
        sectionLabel("05", "Packaging Guidelines"),
        p(
          "Packaging is the primary brand experience at launch. The concept system uses modern-classic cream pouches, product-coloured header bands, gold emblem, farm-landscape illustration, ingredient photography, trust icons, and bilingual naming."
        ),

        h2("Front-of-Pack Hierarchy (top → bottom)"),
        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "Product colour header band with brand mark + tagline strip", size: 20, font: "Arial", color: C.ink })],
        }),
        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "100% VEG symbol (statutory) top-left of face as required", size: 20, font: "Arial", color: C.ink })],
        }),
        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "DHARAA logo lockup (centred or brand-standard position)", size: 20, font: "Arial", color: C.ink })],
        }),
        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "Product name EN (dominant) + HI (secondary)", size: 20, font: "Arial", color: C.ink })],
        }),
        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "Short benefit descriptor (1–2 lines)", size: 20, font: "Arial", color: C.ink })],
        }),
        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "Hero ingredient bowl/photo + supporting whole spices", size: 20, font: "Arial", color: C.ink })],
        }),
        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "Three micro-claims (e.g., Pure & Natural · Hygienically Processed · Rich in Aroma)", size: 20, font: "Arial", color: C.ink })],
        }),
        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: "Net weight — clear and statutory-compliant", size: 20, font: "Arial", color: C.ink })],
        }),

        h2("Trust Strip (brand banner / shelf tray)"),
        p("Approved phrase chain for key visuals and multi-pack displays:", { spacingAfter: 80 }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 160 },
          children: [
            new TextRun({
              text: "CAREFULLY SOURCED  ·  CLEANED NATURALLY  ·  EXPERTLY BLENDED  ·  PACKED WITH CARE",
              bold: true,
              size: 16,
              color: C.forest,
              font: "Arial",
            }),
          ],
        }),

        h2("Approved Trust Icons (concept set)"),
        simpleTable(
          ["Icon theme", "Label"],
          [
            ["Leaf", "Pure & Natural"],
            ["Mortar / quality", "Finest Quality"],
            ["Shield / process", "Hygienically Processed"],
            ["Blend swirl", "Expertly Blended"],
            ["Steam / aroma", "Rich Aroma"],
            ["Family", "Trusted by Families"],
          ],
          [4000, 6466]
        ),
        p(
          "Icons must share one stroke weight and circular container style. Do not mix flat and 3D icon sets.",
          { size: 18, color: C.inkMuted, italics: true, spacingBefore: 100 }
        ),

        h2("Product Descriptor Copy (launch set)"),
        simpleTable(
          ["SKU", "Approved short descriptor"],
          [
            ["Laal Mirchi Powder", "Made from the finest quality red chillies for vibrant colour and bold taste."],
            ["Dhaniya Masala", "Made from premium coriander seeds, finely ground for rich aroma and taste."],
            ["Garam Masala", "A traditional blend of handpicked spices for rich aroma, warmth and authentic taste."],
            ["All in One Masala", "A perfect blend of spices that makes every dish tasty, easy and special."],
          ],
          [2800, 7666]
        ),

        h2("Packaging Production Notes"),
        bullet("Artwork: CMYK + any Pantone gold/spot as specified by print vendor; proof before mass run.", "bullets5"),
        bullet("Material: food-grade laminate suitable for powdered spices; barrier properties per QA.", "bullets5"),
        bullet("Finish: soft-touch or matte cream face preferred; selective gloss on gold emblem optional.", "bullets5"),
        bullet("Bleed: follow printer spec (typically 3mm); keep critical legal text inside safe zone.", "bullets5"),
        bullet("Back panel: ingredients, nutrition (if required), FSSAI, MRP, manufacturer, batch, dates — statutory first.", "bullets5"),
        pageBreak(),

        // ===================== 06 VOICE =====================
        sectionLabel("06", "Voice & Messaging"),
        h2("Voice Attributes"),
        simpleTable(
          ["Attribute", "We are…", "We are not…"],
          [
            ["Authentic", "Honest about origin, process, taste", "Fake heritage or invented farms"],
            ["Warm", "Kitchen-table friendly, inclusive", "Corporate or clinical"],
            ["Trustworthy", "Clear claims we can stand behind", "Exaggerated “world’s best” hype"],
            ["Rooted", "Nature, region, tradition with respect", "Trend-chasing or meme-led"],
            ["Crafted", "Care, blend skill, consistency", "Factory-anonymous commodity talk"],
            ["Accessible premium", "Pride at fair price", "Snobby or bargain-basement"],
          ],
          [2200, 4133, 4133]
        ),

        h2("Tone Matrix by Context"),
        simpleTable(
          ["Context", "Tone", "Example"],
          [
            ["Pack front", "Confident, sensory, short", "Rich aroma. Bold colour. Pure taste."],
            ["Pack back / story", "Warm narrative", "From carefully chosen spices to your kitchen…"],
            ["Retailer pitch", "Practical, trust, margin-aware", "Consistent quality customers repurchase."],
            ["Social / recipes", "Helpful, inviting", "Tonight’s sabzi deserves Dharaa Garam Masala."],
            ["Sampling / events", "Festive, local pride", "Taste the purity of Dharaa — rooted in nature."],
            ["Crisis / complaint", "Calm, accountable", "We’re sorry. Here’s how we’ll make it right."],
            ["Legal / claims", "Precise, compliant", "Only approved substantiated claims."],
          ],
          [2200, 2400, 5866]
        ),

        h2("Messaging Pillars"),
        bulletBoldLead("Nature-rooted purity — ", "Carefully sourced spices, cleaned naturally, free from unnecessary compromise.", "bullets6"),
        bulletBoldLead("Hygienic craft — ", "Hygienically processed and packed with care for family kitchens.", "bullets6"),
        bulletBoldLead("Authentic taste — ", "Expert blends for aroma, colour, and the taste homes recognise.", "bullets6"),
        bulletBoldLead("Trusted value — ", "Mid-premium quality that earns repeat purchase without luxury mark-ups.", "bullets6"),

        h2("Words to Prefer / Avoid"),
        simpleTable(
          ["Prefer", "Avoid"],
          [
            ["Pure, natural, hygienic, carefully sourced", "Chemical-free* (*unless lab-proven & legal)"],
            ["Expertly blended, rich aroma, authentic taste", "World’s best, #1, revolutionary"],
            ["Crafted, rooted, trusted by families", "Cheap, mass-market, discount"],
            ["Premium quality at fair price", "Luxury, exclusive (overpromises)"],
            ["Consistent quality", "Always identical to homemade (unprovable)"],
          ],
          [5233, 5233]
        ),
        p(
          "*Health, purity, and “chemical-free” style claims require legal/regulatory review before use on pack or ads.",
          { size: 16, color: C.inkMuted, italics: true }
        ),
        pageBreak(),

        // ===================== 07 IMAGERY =====================
        sectionLabel("07", "Imagery & Iconography"),
        h2("Photography Style"),
        simpleTable(
          ["Dimension", "Guideline"],
          [
            ["Subject", "Whole spices, ground powder in bowls, traditional kitchen props (mortar, brass)"],
            ["Setting", "Warm wood, cream cloth, soft farm/landscape motifs — never sterile lab only"],
            ["Lighting", "Natural, directional warmth; avoid harsh blue flash"],
            ["Colour grade", "Lean into cream, gold, deep greens; keep spice colours true"],
            ["People", "Real family/kitchen moments when used; respectful, North Indian everyday life"],
            ["Avoid", "Neon filters, stock “corporate handshake”, dirty/unhygienic cues, competitor lookalikes"],
          ],
          [2800, 7666]
        ),

        h2("Illustration"),
        bullet("Farm/landscape line illustrations in sepia-green wash (as in concept pack) support heritage without cluttering product photo.", "bullets7"),
        bullet("Keep illustration behind or around product; never obscure product name or statutory marks.", "bullets7"),
        bullet("Stroke style: fine engraved/heritage line — not cartoon, not cyberpunk.", "bullets7"),

        h2("Iconography"),
        bullet("Circular outline icons with consistent 1.5–2px stroke at 24px base.", "bullets8"),
        bullet("Colour: Forest Green or Gold on cream; white icons on forest or product header bands.", "bullets8"),
        bullet("Themes limited to trust, process, aroma, purity, family — do not invent unrelated icon stories.", "bullets8"),
        pageBreak(),

        // ===================== 08 APPLICATION =====================
        sectionLabel("08", "Application Guidelines"),
        h2("Retail & General Trade"),
        bullet("Shelf presence: keep product colour headers visible; align logo height across SKUs where possible.", "bullets"),
        bullet("Price strips and retailer stickers must not cover logo, product name, veg symbol, or net weight.", "bullets"),
        bullet("POS cards and danglers: cream background, forest headline, one product hero image, gold accent rule.", "bullets"),

        h2("Digital (Web, E-com, Quick commerce)"),
        bullet("PDP images: clean pack front on cream or soft kitchen surface; secondary images show open bowl + ingredients.", "bullets2"),
        bullet("Title format: Dharaa [Product Name] | [Net wt] | [Key benefit].", "bullets2"),
        bullet("Primary CTA colour: Forest Green; text cream or white with verified contrast.", "bullets2"),
        bullet("Never use compressed, skewed, or low-res pack photos on marketplaces.", "bullets2"),

        h2("Social Media"),
        bullet("Profile: emblem or full lockup on cream; highlight covers in forest/cream/gold only.", "bullets3"),
        bullet("Feed: recipe-led and product-led mix; always include readable product name.", "bullets3"),
        bullet("Hashtags (examples): brand + product + regional food culture — avoid spammy repetition.", "bullets3"),
        bullet("Influencers: provide pack kit + claim sheet; require no off-brand filters that shift green/gold.", "bullets3"),

        h2("Advertising & Local Events"),
        bullet("Lead with taste and purity; show pack clearly in last 2 seconds / bottom-right for video.", "bullets4"),
        bullet("Sampling booths: cream tablecloth, forest freestanding banner, gold logo rules.", "bullets4"),
        bullet("Local language versions must preserve brand colours and logo integrity.", "bullets4"),

        h2("Stationery & Internal"),
        bullet("Letterhead: small lockup top-left or centre; forest text; cream paper optional for premium notes.", "bullets5"),
        bullet("Presentations: title slides forest + cream; body slides white/cream with forest headings.", "bullets5"),
        pageBreak(),

        // ===================== 09 CHECKLIST =====================
        sectionLabel("09", "Brand Checklist & Governance"),
        h2("Pre-Flight Checklist (any asset)"),
        simpleTable(
          ["#", "Check"],
          [
            ["1", "Logo is approved master file; clear space and min size respected"],
            ["2", "Colours match palette hex/CMYK; no random greens/golds"],
            ["3", "Fonts match system (or approved fallbacks)"],
            ["4", "Tagline correct spelling and punctuation"],
            ["5", "Product names bilingual where consumer-facing in HI markets"],
            ["6", "Claims match approved list; legal reviewed if health/purity absolute"],
            ["7", "Statutory marks (veg, FSSAI, etc.) correct and unobscured"],
            ["8", "Imagery style on-brand; no competitor-confusable layouts"],
            ["9", "Contrast readable for all essential text"],
            ["10", "File naming and version logged before print/publish"],
          ],
          [800, 9666]
        ),

        h2("Asset Naming Convention"),
        p("Dharaa_[AssetType]_[SKU-or-Channel]_[Variant]_[Colourway]_v[##].[ext]", {
          size: 18,
          color: C.forestDeep,
          bold: true,
        }),
        p("Example: Dharaa_PackFront_LaalMirchi_200g_Primary_v02.pdf", {
          size: 18,
          color: C.inkMuted,
          italics: true,
        }),

        h2("Version Control"),
        simpleTable(
          ["Version", "Date", "Notes"],
          [
            ["1.0", "August 2026", "Initial brand guidelines from Brand Profile + concept packaging"],
          ],
          [1800, 2200, 6466]
        ),

        h2("Who Uses This Document"),
        bullet("Founders & brand owners — final approval on exceptions", "bullets6"),
        bullet("Packaging designers & printers — colour, logo, hierarchy", "bullets6"),
        bullet("Distributors & modern trade teams — POS consistency", "bullets6"),
        bullet("Digital/marketing agencies — social, ads, e-com", "bullets6"),
        bullet("Influencers & local event partners — simplified do/don’t", "bullets6"),

        spacer(300),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 80 },
          border: {
            top: { style: BorderStyle.SINGLE, size: 8, color: C.gold, space: 12 },
          },
          children: [
            new TextRun({
              text: "DHARAA",
              bold: true,
              size: 28,
              color: C.forest,
              font: "Georgia",
              characterSpacing: 160,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: "Rooted in Nature. Crafted for Taste.",
              italics: true,
              size: 18,
              color: C.inkMuted,
              font: "Georgia",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Brand Guidelines v1.0  ·  Confidential — Internal & Partner Use",
              size: 14,
              color: C.inkMuted,
              font: "Arial",
            }),
          ],
        }),
      ],
    },
  ],
});

const outPath = path.join(__dirname, "..", "Dharaa_Brand_Guidelines_v1.docx");
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outPath, buffer);
  console.log("Wrote:", outPath);
  console.log("Size:", buffer.length, "bytes");
});
