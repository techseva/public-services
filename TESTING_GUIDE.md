# Quick Accessibility Testing Guide

## For Users Testing with Screen Readers

### Testing with TalkBack (Android)
1. **Enable TalkBack:**
   - Settings → Accessibility → TalkBack → Turn On
   
2. **Basic Navigation:**
   - Swipe RIGHT → Next element
   - Swipe LEFT → Previous element
   - Double-tap → Activate/Click
   - Two-finger swipe down → Read from top
   
3. **Test These Features:**
   - [ ] Skip to main content link works
   - [ ] Tab names are announced ("Updates tab", "Digital Services tab")
   - [ ] Service cards announce title AND description
   - [ ] Banking Services card is accessible
   - [ ] All bank links are announced with "opens in new window"
   - [ ] Form labels are read correctly
   - [ ] Buttons announce their purpose

### Testing with VoiceOver (iOS)
1. **Enable VoiceOver:**
   - Settings → Accessibility → VoiceOver → Turn On
   
2. **Basic Navigation:**
   - Swipe RIGHT → Next element
   - Swipe LEFT → Previous element
   - Double-tap → Activate
   - Two-finger swipe down → Read all
   
3. **Use Rotor:**
   - Rotate two fingers on screen
   - Select "Headings" or "Links" or "Buttons"
   - Swipe up/down to navigate by that type

### Testing with NVDA (Windows - FREE)
1. **Download & Install:**
   - Visit: https://www.nvaccess.org/download/
   - Install and run NVDA
   
2. **Keyboard Shortcuts:**
   - `NVDA + Down Arrow` → Read next line
   - `H` → Next heading
   - `B` → Next button
   - `K` → Next link
   - `Tab` → Next interactive element
   - `Enter` → Activate
   
3. **Test Checklist:**
   - [ ] Press Tab - should hear "Skip to main content"
   - [ ] Press H repeatedly - navigate through headings
   - [ ] Press B - find all buttons
   - [ ] Press K - find all links
   - [ ] Tab through service cards - hear full descriptions

### Testing with JAWS (Windows - Paid)
1. **Similar to NVDA:**
   - `H` → Next heading
   - `B` → Next button
   - `K` → Next link
   - `Tab` → Next focusable element
   - `Insert + Down Arrow` → Say all

## Keyboard-Only Testing (No Screen Reader)

### Basic Navigation Test
1. **Open the website**
2. **Press Tab key repeatedly:**
   - [ ] First item should be "Skip to main content" link
   - [ ] Focus indicator (yellow outline) is clearly visible
   - [ ] Can navigate to all tabs
   - [ ] Can navigate to all service cards
   - [ ] Can navigate to all buttons
   
3. **Press Enter/Space on focused elements:**
   - [ ] Tabs switch content
   - [ ] Service cards open pages
   - [ ] Buttons activate
   - [ ] Links open

### Focus Indicator Test
1. **Tab through all elements**
2. **Verify each focused element has:**
   - [ ] Yellow (#FFC107) outline
   - [ ] 3px thick outline
   - [ ] 2-4px offset from element
   - [ ] Clearly visible against background

### Skip Link Test
1. **Reload page**
2. **Press Tab once**
3. **Should see "Skip to main content" link appear**
4. **Press Enter**
5. **Focus should jump to main content area**

## Visual Inspection Checklist

### Color Contrast
- [ ] Card titles are black (#000) on white - HIGH CONTRAST ✓
- [ ] Subtitles are dark gray (#333) on white - GOOD CONTRAST ✓
- [ ] Focus indicators are yellow (#FFC107) - HIGHLY VISIBLE ✓
- [ ] All text is readable

### Text Sizing
1. **Zoom to 200%** (Ctrl/Cmd + Plus)
   - [ ] All text remains readable
   - [ ] No text is cut off
   - [ ] Layout doesn't break
   - [ ] All features still accessible

### Focus States
- [ ] All buttons show focus
- [ ] All links show focus
- [ ] All service cards show focus
- [ ] All form inputs show focus
- [ ] All tabs show focus

## Page-Specific Tests

### Home Page (index.html)
- [ ] Skip link works
- [ ] Both tabs are accessible
- [ ] Tab indicator moves correctly
- [ ] All 6 service cards are accessible
- [ ] Banking Services card is present
- [ ] FAB button (if in admin mode) is accessible

### Banking Services Page
- [ ] Page loads correctly
- [ ] All bank cards are accessible
- [ ] Each card announces bank name and description
- [ ] All links open in new window (announced)
- [ ] Can navigate with keyboard only
- [ ] Focus indicators work on all cards

### Updates Page
- [ ] WhatsApp button is accessible
- [ ] Update cards are announced as articles
- [ ] Dates are read correctly
- [ ] Links in updates work
- [ ] Dynamic updates region works

### Service Pages (GSWS, PAN, etc.)
- [ ] Service cards are accessible
- [ ] WhatsApp section is accessible
- [ ] All external links work
- [ ] Sync button (admin mode) is accessible

## Form Accessibility Test

### Modal Dialog Test (Admin Mode)
1. **Open add item modal**
2. **Check:**
   - [ ] Modal is announced as dialog
   - [ ] Title is read
   - [ ] All form labels are read
   - [ ] Tab order is logical
   - [ ] Can close with Escape key
   - [ ] Focus returns to trigger button on close

### Form Input Test
- [ ] Each input has a label
- [ ] Labels are announced before input
- [ ] Required fields are indicated
- [ ] Error messages are announced
- [ ] Dropdowns are keyboard accessible

## Browser Testing

### Test in Multiple Browsers
- [ ] Chrome/Edge - Works correctly
- [ ] Firefox - Works correctly
- [ ] Safari - Works correctly
- [ ] Mobile browsers - Works correctly

### Test Responsive Design
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] All features accessible at all sizes

## Automated Testing Tools

### WAVE (Web Accessibility Evaluation Tool)
1. **Install browser extension**
2. **Run on each page**
3. **Check for:**
   - [ ] Zero errors
   - [ ] All ARIA labels present
   - [ ] Proper heading structure
   - [ ] No contrast errors

### Lighthouse (Chrome DevTools)
1. **Open DevTools (F12)**
2. **Go to Lighthouse tab**
3. **Run Accessibility audit**
4. **Target Score: 95-100**
5. **Fix any issues found**

### aXe DevTools
1. **Install browser extension**
2. **Run scan on each page**
3. **Review all issues**
4. **Verify ARIA implementation**

## Quick Pass/Fail Criteria

### PASS if:
✅ All interactive elements are keyboard accessible
✅ Focus indicators are clearly visible
✅ Screen readers announce all content correctly
✅ Skip links work
✅ All forms have labels
✅ Color contrast is sufficient
✅ Page works at 200% zoom
✅ No keyboard traps
✅ All images have alt text or ARIA labels

### FAIL if:
❌ Cannot access features with keyboard only
❌ Focus indicators are missing or invisible
❌ Screen reader skips important content
❌ Forms have unlabeled inputs
❌ Text is unreadable due to low contrast
❌ Content is cut off at 200% zoom
❌ Keyboard gets trapped in a component
❌ Images lack descriptions

## Common Issues to Check

### Keyboard Traps
- [ ] Can Tab through entire page
- [ ] Can Tab backwards with Shift+Tab
- [ ] Can exit modals with Escape
- [ ] No infinite loops

### Screen Reader Issues
- [ ] No "clickable" or "button" without context
- [ ] No "link" without destination
- [ ] No empty headings
- [ ] No duplicate IDs

### Visual Issues
- [ ] Focus not visible on blue background
- [ ] Text too small to read
- [ ] Insufficient color contrast
- [ ] Content overlapping

## Reporting Issues

If you find accessibility problems:

1. **Document the issue:**
   - Page URL
   - Element affected
   - Expected behavior
   - Actual behavior
   - Assistive technology used

2. **Include:**
   - Screenshot (if visual issue)
   - Steps to reproduce
   - Browser and version
   - Screen reader and version

3. **Priority:**
   - Critical: Cannot access core features
   - High: Difficult to use
   - Medium: Inconvenient
   - Low: Minor improvement

## Success Criteria

### Minimum Requirements (WCAG 2.1 Level AA)
✅ All functionality available via keyboard
✅ Focus indicators visible
✅ Color contrast ratio ≥ 4.5:1 for text
✅ Color contrast ratio ≥ 3:1 for UI components
✅ Text resizable to 200%
✅ Proper heading structure
✅ All images have text alternatives
✅ Forms have labels
✅ No keyboard traps
✅ Skip navigation links provided

### Enhanced Requirements (Best Practices)
✅ ARIA landmarks used correctly
✅ Live regions for dynamic content
✅ Descriptive link text
✅ Error messages are clear
✅ Instructions provided for complex interactions
✅ Timeout warnings given
✅ Help available
✅ Consistent navigation

---

## Quick Start Testing (5 Minutes)

1. **Keyboard Test (2 min):**
   - Tab through entire page
   - Verify focus indicators
   - Activate some links/buttons

2. **Screen Reader Test (2 min):**
   - Turn on screen reader
   - Navigate through headings
   - Listen to a few service cards

3. **Visual Test (1 min):**
   - Zoom to 200%
   - Check color contrast
   - Verify nothing is broken

**If all three pass → Good accessibility! ✅**

---

**Last Updated:** January 2026
**For Questions:** Refer to ACCESSIBILITY.md
