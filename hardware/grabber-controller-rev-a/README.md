# Grabber Controller - Revision A

Status: reconstructed PCB design study, unbuilt. Created November 12, 2026.

This is a new reconstruction of the earlier ESP32 / dual-motor-controller concept for Daniel Joseph's assistive-grabber portfolio. It is not a recovered original file. It has not been fabricated, populated, powered, or integrated into the completed gripper. The team's completed gripper used a switch-based control circuit.

## Design

- 111.76 x 86.36 mm two-layer carrier PCB, nominal 1.6 mm FR-4 / 1 oz copper.
- U1 is a socketed Espressif ESP32-DevKitC V4 with a WROOM module. The two 19-pin rows are 25.40 mm apart at 2.54 mm pin pitch. WROVER variants are unsuitable for the selected GPIO16/17 assignment.
- U2 is a socket for the SparkFun ROB-14450 dual TB6612FNG driver module, two 8-pin rows 15.24 mm apart at 2.54 mm pitch. The driver IC is on that module, not directly on this carrier.
- ESP32 logic power comes only through its own USB connector. The carrier's J1 input feeds only the motor rail. The two rails share ground.
- J1 is a nominal 6-12 V motor input. F1 is a resettable fuse footprint. C1 is 220 uF / 25 V bulk decoupling; C2 and C3 are 100 nF ceramic bypass capacitors.
- J2 and J3 are the two brushed-DC motor outputs.
- J4 exposes GND, OPEN, CLOSE and STOP inputs for normally-open switches. R1-R3 pull the inputs up to 3.3 V.
- J5 is a removable enable shunt. U1 drives ENABLE_REQUEST, and R4 holds driver STBY low if the link is absent. This is a bench enable feature, not a certified emergency-stop circuit.
- J6 is a logic-rail measurement header, not a power input.
- Nominal signal widths are 0.30 mm, logic/ground routing 0.50 mm, and motor-supply/output routing 1.00 mm. The router used a 0.23 mm clearance allowance; the supplied native DRC report uses the editor's default constraints.

## Altium Designer

`GrabberController_AltiumImport.PCB` is an editable P-CAD ASCII interchange file. Altium Designer supports importing this format through File > Import Wizard > P-CAD Designs and Libraries Files. The wizard creates a native Altium PCB project and PcbDoc.

Map Top and Bottom to the two signal layers and BOARD to the board-outline/mechanical layer. Review the mechanical outline and recreate the native board shape after import if required. Reapply constraints and run Altium's own DRC before treating the imported file as an Altium design release.

The design was authored and checked through a PCB design library and KiCad 9.0.7, not through the Altium application. The portfolio layout illustration uses the actual copper geometry in a red/blue EDA colour scheme. Native Altium opening and DRC have not been verified.

## Files

- `GrabberController_AltiumImport.PCB` - P-CAD ASCII layout, including components, pads, nets, tracks, vias, outline and layer information.
- `GrabberController.kicad_pcb` - editable native board used for geometry/DRC verification.
- `BOM.csv` - component values and footprint assumptions.
- `PinConnections.csv` - authoritative point-to-point net assignment table, including unused pins.
- `Connections.svg` - net-labelled connection schematic generated from the same pin table. Matching labels denote an electrical connection. It is a connection drawing, not a native Altium schematic document.
- `PCB_Layout.svg` - actual routing illustration.
- `board-data.json` - placement and copper geometry used for the illustration and interchange export.
- `drc.json` - native-board check report.
- `Validation.md` - check results and import-round-trip limits.

## Engineering assumptions and outstanding work

The initial design target is current-limited bench loads up to 0.5 A per motor channel. The TB6612FNG manufacturer's average/peak ratings are not interchangeable with a motor's stall current. The original JGB37 motor compatibility has not been established. Measure motor startup/stall current and review driver and fuse selection before using this circuit with those motors.

This layout has no current sensing, grip-force sensing, travel-limit inputs, reverse-polarity protection, or validated thermal/current-handling performance. The fuse does not regulate motor current. Host firmware must default the driver to standby, handle conflicting commands, enforce motion timeouts and validate the STOP input before bench use. No new firmware is supplied with this reconstruction.

Component body envelopes, actual connector and PTC part selection, pad/drill tolerances, module mounting orientation, antenna/RF clearance, enclosure clearances, EMC, bulk-capacitor sizing, and patient-use safety require review. The board is not a fabrication release or a tested assistive device.

## Primary references

- Espressif DevKitC V4 pinout and power options: https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32/esp32-devkitc/user_guide.html
- Espressif mechanical dimensions: https://dl.espressif.com/dl/schematics/esp32_devkitc_v4_dimensions.pdf
- SparkFun ROB-14450 hardware: https://github.com/sparkfun/Motor_Driver-Dual_TB6612FNG
- Toshiba TB6612FNG datasheet: https://toshiba.semicon-storage.com/info/datasheet_en_20141001.pdf?did=10660
- Altium P-CAD import documentation: https://www.altium.com/documentation/altium-designer/design-tools-interfacing/altium-design-software-import-export
