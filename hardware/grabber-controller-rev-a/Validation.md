# Validation record

Date: November 12, 2026. Application: KiCad CLI 9.0.7.

## Native board

The native board's DRC report contains 0 violations and 0 unconnected items. No exclusions were added. This is a geometric/default-rule check, not electrical, thermal, mechanical, EMC or hardware validation. No schematic parity/ERC claim is made.

## P-CAD interchange

The Altium-importable P-CAD file was imported back through KiCad's P-CAD importer and saved as a separate temporary board for comparison.

- 84 numbered component pads retained.
- Every numbered pad retained the same net assignment as the native source.
- 20 footprints retained, including 4 mounting-hole objects.
- 654 copper objects retained, including 36 unique through vias.
- 0 unconnected items in the round-trip board.
- The KiCad 9 importer puts the BOARD outline on User.Eco2. The 8 outline segments and their geometry are present, but this requires layer mapping/board-shape review after import. The round-trip board therefore reports an invalid outline until mapping is corrected. Altium's Import Wizard must be checked separately.

The original native board has the outline on Edge.Cuts and passes its DRC. The import file has not been opened in Altium Designer. No fabrication or powered testing was performed.
