# Part A · AC power systems (Chapter 1)

## A1 · MT1 Fall 2024, Q1 (30 pts)

**(a)** A load has v(t) = 230√2 cos(100πt + 45°) V and i(t) = 5√2 cos(100πt + 30°) A. Calculate the average power of the load.

**(b)** A load has V = 588∠35° V and I = 5∠5° A. Calculate the active power P, the reactive power Q and the power factor of the load (leading or lagging).

![Figure 1-2](mt1/img/a1-fig1-2.png)

*Figure 1-2: the source V (delivering P, Q at point A) feeds R1 to point B, where Z is in parallel with R2 + jX2.*

**(c)** In Figure 1-2, V = 220∠25° V, I = 5∠35° A and R1 = 1 Ω. Determine the power factors at points A and B (leading or lagging).

**(d)** In Figure 1-2, \|V\| = 200 V, P = 2 kW, Q = 1.5 kVAR, R1 = 2 Ω, R2 = 20 Ω and X2 = 4 Ω. Determine Z.

**(e)** A single-phase rooftop photovoltaic system on a farmhouse feeds, through a 200 m single-phase cable, a water pump and a capacitor bank at point A (Figure 1-3).

- Water pump: 3 kW at 0.8 power factor, lagging. The voltage across the pump terminals must be 230 V.

- Capacitor bank: designed to improve the power factor at point A to 0.95 lagging.

- Cable: (1.12 + j0.13) Ω/km for each conductor.

Determine the voltage and the active and reactive power settings of the photovoltaic system at the house.

![Figure 1-3](mt1/img/a1-fig1-3.png)

*Figure 1-3: house (PV) → 200 m two-conductor cable → point A (capacitor bank) → water pump.*

## A2 · MT1 Fall 2024, Q2 (35 pts)

**(a)** The input power to a 3-phase balanced inductive load is 5 kW. The rms line-to-line voltage and rms line current at the load terminals are 400 V and 8.66 A. The supply frequency is 50 Hz.

1.  Find the power factor of the load.

2.  A 3-phase capacitor bank is connected in parallel with the load to achieve unity power factor, and the load line-to-line voltage stays at 400 V. Find the total reactive power injected by the bank.

3.  The bank is Δ-connected. Find the capacitance in each phase.

**(b)** A balanced Y-connected source drives a balanced Y-connected load through three lines (Figure 2-1). Phase sequence abc (v_an leads v_bn by 120°), 50 Hz. V_an = 230∠0° V, each line Z_L = 0.1 + j0.5 Ω, each load phase Z_Y = 5 + j3 Ω.

![Figure 2-1](mt1/img/a2-fig2-1.png)

*Figure 2-1: Y source (a, b, c, neutral n) → line impedances Z_L → load terminals A, B, C → Y load with neutral N.*

1.  Find the line current phasors I_a, I_b, I_c.

2.  Find the load line-to-line voltage phasors V_AB, V_BC, V_CA.

3.  Find and plot the instantaneous power delivered to the phase A load.

4.  Find and plot the total instantaneous power delivered to the three-phase load.

5.  Find the complex power of the three-phase load and the corresponding power factor.

6.  The load is reconnected in Δ with Z_Δ = 5 + j3 Ω per phase (Figure 2-2), with the same source and lines. Find the line current I_a, the load phase current I_AB and the line-to-line voltage V_AB.

![Figure 2-2](mt1/img/a2-fig2-2.png)

*Figure 2-2: the same source and lines feeding a Δ load Z_Δ between A, B, C; I_AB flows from A to B.*

## A3 · MT1 Fall 2023, Q1 (35 pts)

A Δ-connected three-phase motor with a rated power of 40 kW and a power factor of 0.8 (lagging) is connected to the power grid through a 5 km cable with an inductance of 0.51 mH/km. The voltage at the motor terminals is kept at 400 V (50 Hz).

**(a)** Calculate the magnitudes of the motor phase-to-neutral voltage and the rated phase current.

**(b)** A compensation capacitor bank is installed at the grid side of the line. Calculate the capacitance of the Y-connected capacitors and their nominal voltage required to increase the power factor at the grid side to unity while the motor works at rated power.

**(c)** Calculate the magnitudes of the currents drawn from the grid before and after the compensation.

**(d)** Calculate the power factor at the grid side when the motor works at half of its rated power, assuming the motor's power factor is constant and the compensation capacitors are still connected to the grid terminals.

## A4 · MT1 Fall 2022, Q1 (30 pts)

Two three-phase parallel loads are connected to a 50 Hz three-phase generator through a 10 km line with 0.3 Ω/km resistance and 9.6 mH/km inductance (figure). The first load is Δ-connected, purely inductive and consumes 180 kVA. The second load consumes 270 kVAR at 0.8 power factor (lagging); its connection type is unknown. The system voltage at the loads' side is 10.4 kV. Calculate:

![MT1 2022 Q1 system](mt1/img/a4-fig.png)

*Figure: generator → 10 km three-phase line → load bus feeding Load 1 (Δ, purely inductive) and Load 2 in parallel.*

**(a)** The voltage across each inductor in the first load and the current amplitude flowing through each of them.

**(b)** The total power consumed by the loads and the power factor.

**(c)** Draw the per-phase equivalent circuit of the system. Only calculate the line impedance.

**(d)** The amplitude of the phase-to-phase and phase-to-neutral voltage of the generator.

**(e)** The total active power lost in the transmission line.

**(f)** The required capacitances and their connection (Y or Δ) to improve the power factor of the loads to unity, given that the highest available capacitor voltage rating is 9 kV.

# Part B · Magnetic circuits (Chapter 2)

## B1 · Chapter 2 problems, Example 1 (this term)

A magnetic core has a 0.2 mm air gap and three coils A, B and C. The core cross-sectional area is 20 cm² and the mean magnetic path length is 50 cm. Determine the number of turns N_C of coil C needed to create a magnetic flux of 3.5 mWb.

Assume μ0 = 10⁻⁶ H/m. Neglect leakage and fringing, and take the core and the gap to have the same cross-sectional area.

Data from the figure (winding senses and the magnetization curve):

- Coil A: N_A = 250 turns, I_A = 2 A.

- Coil B: N_B = 100 turns, I_B = 1.25 A; its MMF opposes coil A.

- Coil C: I_C = 1 A; its MMF aids coil A.

- Magnetization curve, on the segment that contains 1.75 T: B = 1.4 + H (B in T, H in kA/m).

## B2 · Chapter 2 problems, Examples 2–3 (this term)

A core with infinite permeability has three parallel air gaps of lengths 2g, g and g/2 between two common core sections. Each branch has cross-sectional area A. Coil N1 is wound on the 2g branch and coil N2 on the g branch; the g/2 branch has no coil. Neglect leakage and fringing.

Data from the figure: both coils have the same winding sense, and upward flux is positive in each gap, so λ1 = N1φ1 and λ2 = N2φ2. In the series connection, i1 = i2 = i and v = v1 + v2.

Given N1 = 400, N2 = 100, g = 0.1 mm, A = 10 cm², μ0 = 4π × 10⁻⁷ H/m. Find:

**(a)** The signed flux density in each gap and the flux linkage of each coil when only I1 flows.

**(b)** The same quantities when only I2 flows.

**(c)** The flux densities and flux linkages when both currents flow.

**(d)** The two self-inductances and the signed mutual inductance.

**(e)** The coils are connected in series and v(t) = 100 sin(ωt) V is applied; coil resistances are zero. Find the induced voltages v1(t) and v2(t).

**(f)** Show that the answer to (e) holds for any N1, N2 with N1/N2 = 4, whatever g and A are.

## B3 · MT1 Fall 2024, Q3 (35 pts)

Two E-cores are combined and a coil is wound around a plastic former placed on the middle legs (Figure 3-1). Ferrite core (N92) properties and dimensions:

- Cross-section of the outer legs A1 = 100 mm²

- Cross-section of the middle leg A2 = 200 mm²

- Mean core length L_mean = 53 mm (one E-core)

- Gap length in a single core g = 0.5 mm (assembled middle-leg gap 2g = 1 mm)

- Relative permeability μr = 1500 in the linear region, B \< 0.3 T

- μ0 = 4π × 10⁻⁷ H/m, number of turns N = 20

Assume the flux is homogeneously distributed in the core; ignore fringing and leakage.

![Figure 3-1](mt1/img/b3-fig3-1.png)

*Figure 3-1: a) dimensions of a single E-core, b) E-cores with the coil former, c) final assembly 2D view.*

![Figure 3-2](mt1/img/b3-fig3-2.png)

*Figure 3-2: a) B-H characteristic of the core material, b) core loss density vs flux density (100 kHz, 25 °C).*

**(a)** Draw the magnetic equivalent circuit and show the main flux paths. No numerical values are needed, but show all parameters.

**(b)** Calculate the equivalent reluctance of the system while the core operates in the linear region. Also calculate the inductance.

**(c)** What coil current gives a flux density of 0.25 T in the core? What are the magnetic field strengths in the core (H_core) and in the air gap (H_gap) at this operating point?

**(d)** Find the current required to double the flux density in the core (from 0.25 T to 0.5 T). What is the inductance at this operating point? Comment on the effects of this inductance variation in practical applications.

**(e)** Compare the core losses and copper losses for the operating points of (c) and (d), using the numerical values provided:

1.  Taking the core loss in (c) as 100%, how much is the core loss in (d)?

2.  Taking the copper loss in (c) as 100%, how much is the copper loss in (d)?

3.  Comment on the effects of these variations in practical applications.

## B4 · MT1 Fall 2023, Q2 (35 pts)

The rectangular electromagnetic system in the figure has two coils and four air gaps in total. The characteristic of the ferromagnetic core material is given next to the drawing (a vertical line on the B-H plane). Dimensions:

- Vertical air gaps' thickness: y

- Width of the magnetic cores: w

- Axial length of the magnetic cores: l_z

- Horizontal air gaps' thickness: x (can be varied)

Ignore flux outside the magnetic cores except in the air gaps, ignore coil resistance, and assume the core material is not electrically conductive.

![Two-coil system and core B-H characteristic](mt1/img/b4-fig.png)

*Figure: two C-shaped cores side by side, separated by the gap x at the top and bottom. Coil N1 (current i1) is on the left outer leg and coil N2 (current i2, voltage e2) on the right outer leg. Each inner leg has a gap y. Flux labels: φ1, φ1y, φ1x, φ2, φ2y, φ2x. Right: the core material's B-H characteristic.*

**(a)** Draw the magnetic equivalent circuit and calculate the magnetic circuit parameters as functions of N1, N2, i1, i2, x, y, w, l_z.

**(b)** Calculate the self-inductances (L11, L22) and mutual inductances (L12, L21) of coil 1 and coil 2 in terms of reluctances and turn numbers.

**(c)** Coil 2 is open-circuited. Write the induced voltage e2 of coil 2 in terms of the given parameters. Discuss two ways of creating a non-zero induced voltage e2.

**(d)** Fill in the electric equivalent circuit of the system, built around an N1:N2 ideal transformer (series R and X on each side, a shunt R ∥ X magnetizing branch on the primary side):

- Identify the components that are zero (shorted) or infinite (open).

- Identify the flux components (φ1, φ1y, φ2, φ2y, φ1x, φ2x) associated with each circuit component.

- Put the transformer dots and show the i2 direction for the coils as defined.

![Equivalent-circuit template](mt1/img/b4-template.png)

*Figure: the equivalent-circuit template for (d).*

## B5 · MT1 Fall 2021, Q2 (25 pts)

A 140 W USB-C laptop charger uses GaN transistors for high switching speed and contains several inductors. Assume leakage flux is ignored and all magnetic flux is homogeneously distributed within the core.

**Part I.** A 25-turn winding is wrapped around a toroidal core:

- Core material: nanocrystalline, relative permeability μr = 25000

- μ0 = 4π × 10⁻⁷ H/m, saturation flux density B_sat = 1.2 T

- Inner diameter 12 mm, outer diameter 24 mm, height 6 mm

![Toroidal core](mt1/img/b5-toroid.png)

*Figure: the toroidal core with its inner diameter, outer diameter and height.*

**(a)** Calculate the inductance of this toroidal inductor.

**(b)** Calculate the maximum current this inductor can carry without saturating the core.

**Part II.** High switching speeds create high dv/dt waveforms, which drive common-mode noise currents through parasitic stray capacitances. Common-mode currents flow in the same direction in the positive and negative conductors. The charger has a common-mode filter: two separate windings on one toroid, with self-inductances L1 = L2 = 12.5 mH.

![Common-mode connection](mt1/img/b5-cm.png)

*Figure (c): both windings carry current I in the same direction from a to b (common mode).*

**(c)** Calculate the equivalent inductance of the filter (from a to b) when both windings carry current in the same direction (common-mode current). Also calculate the equivalent impedance at 400 kHz.

![Differential-mode connection](mt1/img/b5-dm.png)

*Figure (d): current I goes in through one winding and returns through the other (differential mode).*

**(d)** Calculate the equivalent inductance and impedance at 400 kHz for the differential-mode current. Comment on the results and explain the function of this device.

# Part C · Single-phase transformers (Chapter 3, first half)

## C1 · MT1 Fall 2023, Q3 (35 pts)

The METU campus has about 40 distribution transformers that reduce the 34.5 kV medium voltage (MV) to 230 V low voltage (LV). They are three-phase, but a single-phase transformer model with the specs below is used for this question.

| Parameter                | Value            |
|--------------------------|------------------|
| Turns ratio N1 : N2      | 150 : 1          |
| R1, R2                   | 18 Ω, 0.0008 Ω   |
| jX1, jX2                 | j36 Ω, j0.0016 Ω |
| R_c, jX_m (primary side) | 245 kΩ, j70 kΩ   |

**(a)** Draw the equivalent circuit with all components referred to the primary side. You may move the parallel branch to the primary terminals.

**(b)** The secondary terminal voltage is 230 V and the secondary supplies 1500 A at 37° lagging (cos 37° ≅ 0.8). Calculate the primary terminal voltage (magnitude and phase).

**(c)** Draw the phasor diagram with the referred secondary voltage V2′, the referred current I2′ and the primary voltage V1. Plot the waveforms against time, labelling the time axis, the peak values and the phase differences.

**(d)** Calculate the core loss, the copper loss and the efficiency at this operating point.

**(e)** The transformer now delivers the same real power at unity power factor, with the secondary voltage still 230 V. Does the efficiency change? Explain (no numbers required).

**(f)** How would R_c and X_m change if the same transformer were connected to a 60 Hz grid with the same terminal voltage? Explain in detail.

## C2 · MT2 Fall 2024, Q1 (30 pts)

The figures show a 20 kVA, 2000/200 V, 50 Hz single-phase transformer and its equivalent model. The core cross-section is 100 cm² and the core is designed to operate up to the saturation flux density of 1.6 T on the B-H curve given. The model has R_c = 12.5 kΩ and X_m = 2 kΩ across the HV terminals, and r_eq, x_eq in series on the LV side of the ideal transformer.

An available 50 Hz test source can provide up to 200 V and 10 A. Calculate:

![Transformer, B-H curve and model](mt1/img/c2-fig.png)

*Figure 1: single-phase transformer, N_HV and N_LV on a core with mean length l_m. Figure 2: B-H curve, linear up to 1.6 T at 320 A/m, then nearly flat. Below: equivalent model with R_c = 12.5 kΩ ∥ X_m = 2 kΩ on the HV side and r_eq + jx_eq on the LV side.*

**(a)** The voltage, current and active power required to perform the nominal open-circuit test from the proper side.

**(b)** r_eq and x_eq in the figure, if 5.6% of the nominal voltage and 500 W are required to perform the nominal short-circuit test from the proper side.

**(c)** The maximum possible efficiency in percent, and the load (active power and power factor) at which it is achieved.

**(d)** The number of turns on the HV and LV sides (N_HV and N_LV).

**(e)** The average length of the core (l_m in the figure). If you could not find the number of turns in (d), assume N_LV = 100.

## C3 · MT1 Fall 2022, Q3 (40 pts)

This question has two independent parts.

**Part 1 · Equivalent circuit model (15 pts).** Answer for the given equivalent circuit of a single-phase transformer (R1, X1, shunt R_c ∥ X_m, ideal N1:N2 transformer with e1, e2, then X2, R2; terminal quantities v1, i1, v2, i2).

![Exact equivalent circuit](mt1/img/c3-circuit.png)

*Figure: the exact equivalent circuit of the single-phase transformer.*

**(a)** For N1 ≫ N2, compare the magnitudes of X1 and X2. Briefly explain your reasoning.

**(b)** Under which conditions is v1/v2 = N1/N2? Explain with the physical meaning of the equivalent circuit parameters (for example, do not only say "if we ignore R_c").

**(c)** Two materials have the B-H loops shown at 1.5 T peak flux density, marked 1 and 2 (both reach 1.5 T at 300 A/m; loop 2 is wider). If material 2 is used instead of material 1, which component of the equivalent circuit is affected and how? Explain.

![B-H loops of materials 1 and 2](mt1/img/c3-bh.png)

*Figure: B-H loops of materials 1 and 2 at 1.5 T peak.*

**Part 2 · Calculations (25 pts).** A 1000 VA, 115:230 V, 50 Hz single-phase transformer is inspected in a laboratory. The winding resistances measured at 50 Hz are R1 = 0.25 Ω and R2 = 1 Ω. The voltages and currents below are measured at the primary and secondary terminals with an available load; the primary voltage is adjusted until rated voltage is obtained at the secondary terminals.

- v1(t) = 171.25 cos(2π50t + 10.66°) V

- i1(t) = 11.7 cos(2π50t − 0.5°) A

- v2(t) = 325.30 cos(2π50t) V

- i2(t) = 5.66 cos(2π50t) A

You can assume an approximate equivalent circuit with the parallel branch carried to the primary terminals.

**(a)** Calculate the transformer's efficiency in percent.

**(b)** Calculate the copper and core losses.

**(c)** Calculate R_c in the equivalent circuit.

**(d)** Calculate X_eq = X1 + X2′ in the equivalent circuit. A phasor diagram can help.

**(e)** Keeping the secondary voltage and current the same, calculate the new efficiency for X_eq = 0. How and why does X_eq affect the efficiency?

**(f)** Is the core saturated at this operating condition? Comment based on the given voltage and current waveforms.

## C4 · MT2 Fall 2023, Q1 (40 pts)

This question has three independent parts.

**Part I (10 pts).** State whether each statement is true or false and give an explanation.

1.  The electrical resistance of a coil (conductor) does not depend on the frequency.

2.  Laminated steel (electrical steel) is used to decrease hysteresis losses.

3.  Transformer cores are usually built with intentionally added air gaps.

4.  If a 50 Hz AC voltage is supplied to an electromagnetic device, a pure 50 Hz AC current is always observed.

5.  Copper is a ferromagnetic material.

**Part II (12 pts).** For the single-phase transformer circuit (V1 → R_eq → jX_eq → V2′, current i1 = i2′) and the phasor diagram given, choose the correct option in each line.

![Series circuit and phasor diagram](mt1/img/c4-phasor.png)

*Figure: the series circuit R_eq, jX_eq and its phasor diagram: V2′ horizontal, I2′ below it (lagging), V1 longer than V2′ and slightly above it.*

1.  Positive / negative active power is supplied to the load.

2.  Positive / negative reactive power is supplied to the load.

3.  The voltage regulation of the transformer is positive / negative.

4.  The power factor at the primary terminal is lagging / leading.

5.  The power factor at the secondary terminal is lagging / leading.

6.  The only loss-related component in the circuit is due to resistive losses / core losses.

**Part III (18 pts) · Transformer tests.** A 10 kVA, 2500/250 V, 50 Hz single-phase transformer gave these test results:

|           | Open-circuit test | Short-circuit test |
|-----------|-------------------|--------------------|
| Voltmeter | 250 V             | 80 V               |
| Ammeter   | 0.5 A             | 4 A                |
| Wattmeter | 100 W             | 80 W               |

You can assume the approximate model with the parallel branch carried to the HV or LV terminals.

**(a)** Determine the side on which each test was performed and briefly explain why.

**(b)** Calculate the equivalent series impedance (Z = R + jX) referred to the LV side.

**(c)** Calculate the parallel branch impedance (R_c, X_m) referred to the LV side.

**(d)** Calculate the efficiency when the transformer supplies half of its rated power at rated voltage to a purely resistive load.
