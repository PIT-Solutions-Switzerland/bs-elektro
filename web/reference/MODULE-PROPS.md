# BS Elektro AG – Module Props Documentation

This document defines all CMS modules, their props, and the corresponding Sanity schema field types.

---

## Global Components

### Header
**Not a CMS module** – static component, same on all pages.

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| logo | image | yes | Company logo (SVG preferred) |
| navLinks | array | yes | Array of { label, href } |
| ctaButton | object | yes | { label, href } |

---

### Footer
**Not a CMS module** – static component, same on all pages.

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| navLinks | array | yes | Array of { label, href } |
| companyName | string | yes | |
| address | text | yes | Multi-line address |
| copyright | string | yes | |
| legalLinks | array | yes | Array of { label, href } |

---

## CMS Modules

### 1. Section Header
**Sanity type:** `sectionHeader`

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| label | string | no | Small green text above title (e.g., "Über uns") |
| title | string | yes | Large display heading (H1 or H2) |
| intro | text | no | Introductory paragraph |

---

### 2. Content Module
**Sanity type:** `contentModule`

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| heading | string | yes | H2 heading |
| content | portableText | yes | Rich text with H3 subheadings allowed |

**Portable Text config:**
- Allow: bold, italic, links
- Block types: normal, h3
- No images in body

---

### 3. Image Text Module
**Sanity type:** `imageText`

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| image | image | yes | With alt text field |
| title | string | yes | H2 heading |
| text | text | yes | Plain text paragraph |
| ctaText | string | no | Button label |
| ctaLink | string | no | Button URL (internal or external) |
| reversed | boolean | no | Default: false. If true, image on right |

---

### 4. Referenzen Overview
**Sanity type:** `referenzenOverview`

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| title | string | yes | Section title (e.g., "Referenzen") |
| referenzen | array | yes | References to `referenz` documents |

**Referenced document: `referenz`**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | string | yes | Project name (e.g., "E-Mobility Alpenblickstrasse") |
| slug | slug | yes | URL-friendly identifier |
| image | image | yes | Main project image with alt text |
| address | string | no | Project address |
| description | text | yes | Objektbeschreibung |
| completionYear | string | yes | Fertigstellung (e.g., "2024") |
| buildType | string | yes | Bauart (e.g., "Umbau", "Neubau") |
| buildingType | string | no | Gebäudeart |
| services | array | yes | Leistungsbeschreibung – array of strings |
| client | string | yes | Bauherrschaft |

---

### 5. Dienstleistungen Cards
**Sanity type:** `dienstleistungenCards`

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| label | string | no | Small text above title |
| title | string | yes | Section title |
| items | array | yes | Array of dienstleistung items (inline) |

**Inline item structure:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| number | string | yes | Display number (e.g., "01") |
| title | string | yes | Service name |
| description | text | yes | Service description |

---

### 6. Contact Module (Map + Details)
**Sanity type:** `contactModule`

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| title | string | yes | Section title (e.g., "Kontakt") |
| mapEmbedUrl | url | yes | Google Maps embed URL |
| address | text | yes | Full company address |
| phone | string | yes | Phone number |
| email | string | yes | Email address |

---

### 7. Contact Form
**Sanity type:** `contactForm`

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| title | string | yes | Form heading |
| intro | string | no | Text above form |
| subjectOptions | array | no | Array of { value, label } for dropdown |
| submitLabel | string | yes | Button text |

**Note:** Form handling is frontend logic, not CMS content.

---

### 8. Management Module
**Sanity type:** `managementModule`

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| title | string | yes | Section title (e.g., "Geschäftsleitung") |
| people | array | yes | References to `person` documents |

**Referenced document: `person`**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | string | yes | Full name |
| role | string | yes | Job title |
| image | image | yes | Portrait photo with alt text |
| bio | text | no | Short CV/description |
| phone | string | no | Direct phone number |
| email | string | no | Direct email |

---

### 9. Referenz Overlay
**Not a separate module** – rendered from `referenz` document data when a Referenz card is clicked.

Uses all fields from `referenz` document (see #4 above).

---

## Page Schema

**Sanity type:** `page`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | string | yes | Page title (for internal use) |
| slug | slug | yes | URL path |
| seoTitle | string | no | Custom SEO title |
| seoDescription | text | no | Meta description |
| modules | array | yes | Array of module references |

**Allowed modules in array:**
- sectionHeader
- contentModule
- imageText
- referenzenOverview
- dienstleistungenCards
- contactModule
- contactForm
- managementModule

---

## Homepage Schema

**Sanity type:** `homepage` (singleton)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| seoTitle | string | no | |
| seoDescription | text | no | |
| hero | object | yes | Hero section (see below) |
| modules | array | yes | Array of module references |

**Hero object:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| image | image | yes | Hero background image |
| title | string | yes | Main heading |
| subtitle | string | no | Subheading |
| contactLabel | string | no | Label above contact info |
| phone | string | yes | Phone number |
| email | string | yes | Email address |

---

## File Structure (suggested for Astro)

```
/src
  /components
    Header.astro
    Footer.astro
    /modules
      SectionHeader.astro
      ContentModule.astro
      ImageText.astro
      ReferenzenOverview.astro
      ReferenzOverlay.astro
      DienstleistungenCards.astro
      ContactModule.astro
      ContactForm.astro
      ManagementModule.astro
    ModuleRenderer.astro        # Dynamic module switcher
  /layouts
    BaseLayout.astro
  /pages
    index.astro
    [slug].astro                # Dynamic pages
  /styles
    global.css
  /lib
    sanity.ts                   # Sanity client
    queries.ts                  # GROQ queries
/sanity
  /schemas
    /documents
      page.ts
      homepage.ts
      referenz.ts
      person.ts
    /modules
      sectionHeader.ts
      contentModule.ts
      imageText.ts
      referenzenOverview.ts
      dienstleistungenCards.ts
      contactModule.ts
      contactForm.ts
      managementModule.ts
    index.ts                    # Schema exports
```

---

## Notes for Implementation

1. **Images:** Use Sanity's image pipeline with `@sanity/image-url` for responsive images
2. **Portable Text:** Use `@portabletext/to-html` or Astro's portable text component
3. **Overlay:** Implement with JavaScript, load referenz data on click or pre-render all
4. **Form:** Connect to your preferred backend (Netlify Forms, custom API, etc.)
5. **Preview:** Consider Sanity's preview mode for draft content
