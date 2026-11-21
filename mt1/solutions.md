# Part A · AC power systems

## A1 · MT1 Fall 2024, Q1

**(a)** Use RMS values and the angle between v and i.

$$
P = V_{rms} I_{rms}\cos(\theta_v-\theta_i) = 230\cdot 5\cos(45^\circ-30^\circ) = 1110.81\ \text{W}
$$

**(b)** Complex power uses the conjugate of the current.

$$
S = V I^* = 588\angle 35^\circ \cdot 5\angle -5^\circ = 2940\angle 30^\circ\ \text{VA} = 2546.11 + j1470\ \text{VA}
$$

P = 2546.11 W, Q = 1470 VAR, pf = cos 30° = 0.866 lagging (Q > 0, current lags voltage).

**(c)** Point A:

$$
S_A = V I^* = 220\angle 25^\circ\cdot 5\angle -35^\circ = 1100\angle -10^\circ = 1083.29 - j191.01\ \text{VA}
$$

pf\_A = cos 10° = 0.985 leading (Q < 0).

Point B: R1 absorbs only active power, I²R1 = 5² · 1 = 25 W. Reactive power is unchanged.

$$
S_B = (1083.29-25) - j191.01 = 1058.29 - j191.01\ \text{VA},\qquad pf_B = \frac{1058.29}{\sqrt{1058.29^2+191.01^2}} = 0.984\ \text{leading}
$$

**(d)** Take V = 200∠0° V as reference.

$$
I = \left(\frac{S}{V}\right)^* = \left(\frac{2000+j1500}{200}\right)^* = 10 - j7.5\ \text{A}
$$

$$
Z_{tot} = \frac{V}{I} = \frac{200}{10-j7.5} = 12.8 + j9.6\ \Omega,\qquad Z_{par} = Z_{tot} - R_1 = 10.8 + j9.6\ \Omega
$$

Z\_par is Z in parallel with R2 + jX2, so

$$
Z = \left(\frac{1}{Z_{par}} - \frac{1}{20+j4}\right)^{-1} = 2.731 + j27.228\ \Omega = 27.36\angle 84.27^\circ\ \Omega
$$

Check: with this Z the source delivers 2000 + j1500 VA.

**(e)** The cable has two conductors of 0.2 km each:

$$
R = 2(0.2)(1.12) = 0.448\ \Omega,\qquad X = 2(0.2)(0.13) = 0.052\ \Omega
$$

Pump: P = 3000 W, Q = 3000 tan(cos⁻¹ 0.8) = 2250 VAR. At point A (pf 0.95 lagging):

$$
Q_A = 3000\tan(\cos^{-1}0.95) = 986.05\ \text{VAR}\quad\Rightarrow\quad Q_C = 2250 - 986.05 = 1263.95\ \text{VAR (capacitor)}
$$

Cable current, with V\_A = 230∠0° V:

$$
I = \left(\frac{3000 + j986.05}{230}\right)^* = 13.73\angle -18.19^\circ\ \text{A}
$$

Voltage at the house:

$$
V_{PV} = V_A + I(R+jX) = 230 + 13.73\angle -18.19^\circ\,(0.448 + j0.052) = 236.07\angle -0.30^\circ\ \text{V}
$$

Cable losses: I²R = 13.73² · 0.448 = 84.45 W and I²X = 13.73² · 0.052 = 9.80 VAR.

$$
P_{PV} = 3000 + 84.45 = 3084.45\ \text{W},\qquad Q_{PV} = 986.05 + 9.80 = 995.85\ \text{VAR}
$$

PV settings: **|V| = 236.07 V, P = 3.084 kW, Q = 0.996 kVAR** (supplied, lagging).

## A2 · MT1 Fall 2024, Q2

**(a1)** Apparent power and power factor:

$$
|S| = \sqrt3\,V_L I_L = \sqrt3\cdot 400\cdot 8.66 = 6000\ \text{VA},\qquad pf = \frac{P}{|S|} = \frac{5000}{6000} = 0.833\ \text{lagging}
$$

**(a2)** The bank must cancel all of the load's reactive power:

$$
Q = \sqrt{|S|^2 - P^2} = \sqrt{6000^2-5000^2} = 3316.6\ \text{VAR}\quad\Rightarrow\quad Q_C = 3.317\ \text{kVAR injected}
$$

**(a3)** In Δ, each capacitor sees the line voltage 400 V and supplies one third:

$$
Q_{C,ph} = \frac{3316.6}{3} = 1105.5\ \text{VAR},\quad X_C = \frac{400^2}{1105.5} = 144.74\ \Omega,\quad C = \frac{1}{\omega X_C} = \frac{1}{100\pi\cdot 144.74} = 22.0\ \mu\text{F}
$$

**(b1)** Per-phase (a-phase) circuit: V\_an drives Z\_L + Z\_Y.

$$
I_a = \frac{230\angle 0^\circ}{(0.1+j0.5)+(5+j3)} = \frac{230\angle 0^\circ}{6.185\angle 34.46^\circ} = 37.18\angle -34.46^\circ\ \text{A}
$$

I\_b = 37.18∠−154.46° A, I\_c = 37.18∠85.54° A.

**(b2)** Load phase voltage, then line voltage (abc: V\_AB leads V\_AN by 30° and is √3 larger):

$$
V_{AN} = Z_Y I_a = 5.831\angle 30.96^\circ\cdot 37.18\angle -34.46^\circ = 216.82\angle -3.50^\circ\ \text{V}
$$

$$
V_{AB} = \sqrt3\,V_{AN}\angle 30^\circ = 375.54\angle 26.50^\circ\ \text{V}
$$

V\_BC = 375.54∠−93.50° V, V\_CA = 375.54∠146.50° V.

**(b3)** Phase A power with θ = −3.50° − (−34.46°) = 30.96°:

$$
S_A = V_{AN}I_a^* = 216.82\cdot 37.18\angle 30.96^\circ = 6913 + j4148\ \text{VA},\qquad |S_A| = 8062\ \text{VA}
$$

$$
p_A(t) = v_{AN}(t)\,i_a(t) = P_A + |S_A|\cos(2\omega t - 3.50^\circ - 34.46^\circ) = 6913 + 8062\cos(200\pi t - 37.96^\circ)\ \text{W}
$$

Plot: a cosine at twice the line frequency (period 10 ms) around the average 6.913 kW, swinging between p\_max = 6913 + 8062 = 14.98 kW and p\_min = 6913 − 8062 = −1.15 kW. The short negative part is the inductive energy flowing back.

**(b4)** The three double-frequency terms are 120° apart and cancel, so the total is constant:

$$
p_{3\phi}(t) = 3P_A = 3\cdot 6913 = 20.74\ \text{kW}\quad\text{(a flat line)}
$$

**(b5)**

$$
S_{3\phi} = 3V_{AN}I_a^* = 20.74 + j12.44\ \text{kVA} = 24.19\angle 30.96^\circ\ \text{kVA},\qquad pf = \cos 30.96^\circ = 0.857\ \text{lagging}
$$

**(b6)** Convert the Δ load to its Y equivalent, Z\_Δ/3 = 1.667 + j1 Ω:

$$
I_a = \frac{230\angle 0^\circ}{(0.1+j0.5)+(1.667+j1)} = \frac{230}{2.318\angle 40.33^\circ} = 99.24\angle -40.33^\circ\ \text{A}
$$

For abc sequence the Δ phase current leads the line current by 30° and is √3 smaller:

$$
I_{AB} = \frac{I_a}{\sqrt3}\angle 30^\circ = 57.30\angle -10.33^\circ\ \text{A},\qquad V_{AB} = Z_\Delta I_{AB} = 5.831\angle 30.96^\circ\cdot 57.30\angle -10.33^\circ = 334.10\angle 20.63^\circ\ \text{V}
$$

The printed key uses V\_AN = 216.04 V in (b2)–(b5). The correct value is 216.82 V, which is why its 375.54 V, 6.913 kW, 20.74 kW and 24.19 kVA differ slightly from the key's 374.19 V, 6.889 kW, 20.67 kW and 24.10 kVA.

## A3 · MT1 Fall 2023, Q1

**(a)** Work per phase on the equivalent Y.

$$
V_{ph} = \frac{400}{\sqrt3} = 230.94\ \text{V},\qquad I_L = \frac{40000}{\sqrt3\cdot 400\cdot 0.8} = 72.17\ \text{A},\qquad I_{ph,\Delta} = \frac{I_L}{\sqrt3} = \frac{40000}{3\cdot 400\cdot 0.8} = 41.67\ \text{A}
$$

The rated phase (winding) current of the Δ motor is 41.67 A; the line current is 72.17 A.

**(b)** Cable reactance per phase:

$$
X = \omega L = 2\pi\cdot 50\cdot (0.51\times10^{-3}\cdot 5) = 0.801\ \Omega
$$

Per phase, the motor takes S = (40 + j30)/3 = 13.33 + j10 kVA. With V\_motor = 230.94∠0° V the line current is I = 72.17∠−36.87° A.

Grid-side phase voltage:

$$
V_{g} = V_{ph} + jX I = 230.94 + j0.801\cdot 72.17\angle -36.87^\circ = 269.63\angle 9.88^\circ\ \text{V}\quad (467.0\ \text{V line-to-line})
$$

Reactive power the capacitors must supply per phase = cable vars + motor vars:

$$
Q_{C,ph} = X I^2 + 10000 = 0.801\cdot 72.17^2 + 10000 = 4172 + 10000 = 14172\ \text{VAR}
$$

$$
C = \frac{Q_{C,ph}}{\omega V_g^2} = \frac{14172}{100\pi\cdot 269.63^2} = 620.5\ \mu\text{F per phase (Y)}
$$

Each Y capacitor sees the grid phase voltage: nominal voltage ≈ 270 V (467 V line-to-line). Total bank = 42.52 kVAR.

**(c)** Before compensation the grid supplies the motor line current, I = 72.17 A. After compensation the grid supplies only 40 kW at unity power factor:

$$
I_{after} = \frac{40000}{3\cdot 269.63} = 49.45\ \text{A}
$$

**(d)** Motor at half power, its terminal voltage still 400 V: S = (20 + j15)/3 = 6.667 + j5 kVA per phase and I' = 36.08∠−36.87° A.

$$
V_g' = 230.94 + j0.801\cdot 36.08\angle -36.87^\circ = 249.36\angle 5.32^\circ\ \text{V},\qquad Q_{line}' = 0.801\cdot 36.08^2 = 1043\ \text{VAR}
$$

The capacitor's vars fall with the square of the new voltage:

$$
Q_C' = \omega C V_g'^2 = 100\pi\cdot 620.5\times10^{-6}\cdot 249.36^2 = 12122\ \text{VAR}
$$

$$
Q_{grid} = 5000 + 1043 - 12122 = -6079\ \text{VAR},\qquad pf = \frac{6667}{\sqrt{6667^2 + 6079^2}} = 0.739\ \text{leading}
$$

The printed key adds the full 30 kVAR of the motor to a single phase in (b), so it gets C = 1.5 mF and pf = 0.275 leading in (d). Per phase the motor needs 10 kVAR, which gives the values above.

## A4 · MT1 Fall 2022, Q1

**(a)** In Δ each inductor sits between two lines, so it sees the line voltage, 10.4 kV. Purely inductive 180 kVA means j180 kVA, i.e. 60 kVAR per inductor:

$$
I_{ph} = \frac{60000}{10400} = 5.77\ \text{A (RMS)}
$$

**(b)** Load 2: sin θ = 0.6, so |S2| = 270/0.6 = 450 kVA and P2 = 0.8 · 450 = 360 kW.

$$
S = S_1 + S_2 = j180 + (360 + j270) = 360 + j450\ \text{kVA},\qquad |S| = 576.3\ \text{kVA},\qquad pf = \frac{360}{576.3} = 0.625\ \text{lagging}
$$

Total consumed: 360 kW (450 kVAR).

**(c)** Per-phase circuit: generator phase voltage → Z\_line → load bus at 10.4/√3 kV, with Load 1 and Load 2 (as Y equivalents) in parallel to neutral.

$$
R = 10\cdot 0.3 = 3\ \Omega,\qquad X = 2\pi\cdot 50\cdot(10\cdot 9.6\times10^{-3}) = 30.16\ \Omega,\qquad Z_{line} = 3 + j30.16\ \Omega
$$

**(d)** Reference V\_ph = 10400/√3 = 6004.4∠0° V.

$$
I = \left(\frac{S}{3V_{ph}}\right)^* = \left(\frac{360000 + j450000}{3\cdot 6004.4}\right)^* = 19.99 - j24.98\ \text{A}\quad (31.99\ \text{A})
$$

$$
V_S = V_{ph} + Z_{line} I = 6004.4 + (3 + j30.16)(19.99 - j24.98) = 6838\angle 4.43^\circ\ \text{V}
$$

Generator: phase-to-neutral 6.84 kV, phase-to-phase √3 · 6.84 = 11.84 kV (RMS).

**(e)**

$$
P_{loss} = 3|I|^2 R = 3\cdot 31.99^2\cdot 3 = 9.21\ \text{kW}
$$

**(f)** Unity pf: the capacitors must supply all 450 kVAR, i.e. 150 kVAR per phase. In Δ each capacitor would see 10.4 kV > 9 kV, so it is not allowed. In Y each sees 10.4/√3 = 6.0 kV < 9 kV, so use **Y**.

$$
C = \frac{Q_{ph}}{\omega V_{ph}^2} = \frac{150000}{100\pi\cdot 6004.4^2} = 13.24\ \mu\text{F per phase (Y)}
$$

# Part B · Magnetic circuits

## B1 · Chapter 2 problems, Example 1

**1. Flux density.** Core and gap have the same area:

$$
B_{core} = B_{gap} = \frac{\Phi}{A} = \frac{3.5\times10^{-3}}{20\times10^{-4}} = 1.75\ \text{T}
$$

**2. Core field intensity** from the segment B = 1.4 + H:

$$
H_{core} = 1.75 - 1.4 = 0.35\ \text{kA/m} = 350\ \text{A/m}
$$

**3. Gap field intensity:**

$$
H_{gap} = \frac{B}{\mu_0} = \frac{1.75}{10^{-6}} = 1.75\times10^{6}\ \text{A/m}
$$

**4. MMF law around the loop** (B opposes A, C aids A):

$$
N_AI_A - N_BI_B + N_CI_C = H_{core}l_{core} + H_{gap}l_{gap}
$$

$$
250(2) - 100(1.25) + N_C(1) = 350(0.5) + 1.75\times10^{6}(0.2\times10^{-3}) = 175 + 350 = 525\ \text{A}\cdot\text{t}
$$

**5. Result:**

$$
N_C = 525 - 500 + 125 = 150\ \text{turns}
$$

The 0.2 mm gap needs 350 A·t, twice the 175 A·t needed by 50 cm of iron.

## B2 · Chapter 2 problems, Examples 2–3

**Setup.** With r = g/(μ0A), the gap reluctances are R1 = 2r (2g), R2 = r (g), R3 = r/2 (g/2).

$$
r = \frac{g}{\mu_0 A} = \frac{0.1\times10^{-3}}{4\pi\times10^{-7}\cdot 10\times10^{-4}} = 7.958\times10^{4}\ \text{A}\cdot\text{t/Wb},\qquad \frac{1}{7r} = 1.7952\times10^{-6}\ \text{Wb/(A}\cdot\text{t)}
$$

Flux continuity at the core node and the MMF law around the two windows:

$$
\phi_1 + \phi_2 + \phi_3 = 0,\qquad 2r\phi_1 - \tfrac{r}{2}\phi_3 = N_1I_1,\qquad r\phi_2 - \tfrac{r}{2}\phi_3 = N_2I_2
$$

$$
\phi_1 = \frac{3N_1I_1 - N_2I_2}{7r},\qquad \phi_2 = \frac{-N_1I_1 + 5N_2I_2}{7r},\qquad \phi_3 = \frac{-2N_1I_1 - 4N_2I_2}{7r},\qquad B_k = \frac{\phi_k}{A}
$$

**(a)** Only I1:

$$
\phi_1 = 2.1542\times10^{-3}I_1,\quad \phi_2 = -7.1808\times10^{-4}I_1,\quad \phi_3 = -1.4362\times10^{-3}I_1\ \text{Wb}
$$

B1 = 2.1542 I1 T, B2 = −0.71808 I1 T, B3 = −1.4362 I1 T; λ1 = 0.86169 I1, λ2 = −0.071808 I1 Wb-t.

**(b)** Only I2:

$$
\phi_1 = -1.7952\times10^{-4}I_2,\quad \phi_2 = 8.9760\times10^{-4}I_2,\quad \phi_3 = -7.1808\times10^{-4}I_2\ \text{Wb}
$$

B1 = −0.17952 I2 T, B2 = 0.8976 I2 T, B3 = −0.71808 I2 T; λ1 = −0.071808 I2, λ2 = 0.08976 I2 Wb-t.

**(c)** Superposition:

$$
B_1 = 2.1542I_1 - 0.17952I_2,\quad B_2 = -0.71808I_1 + 0.8976I_2,\quad B_3 = -1.4362I_1 - 0.71808I_2\ \text{T}
$$

$$
\lambda_1 = 0.86169I_1 - 0.071808I_2,\qquad \lambda_2 = -0.071808I_1 + 0.08976I_2\ \text{Wb-t}
$$

**(d)** From λ1 = L11 I1 + M I2 and λ2 = M I1 + L22 I2:

$$
L_{11} = 861.69\ \text{mH},\qquad L_{22} = 89.76\ \text{mH},\qquad M = -71.808\ \text{mH}
$$

M is the same both ways (reciprocity). It is negative because the flux each coil drives through the other coil's gap points against that coil's positive linkage direction.

**(e)** Series: I1 = I2 = i.

$$
\lambda_1 = (L_{11}+M)i = 0.78988\,i,\qquad \lambda_2 = (M+L_{22})i = 0.017952\,i,\qquad \frac{v_1}{v_2} = \frac{\lambda_1}{\lambda_2} = 44
$$

$$
v_1 = \tfrac{44}{45}v = 97.78\sin(\omega t)\ \text{V},\qquad v_2 = \tfrac{1}{45}v = 2.22\sin(\omega t)\ \text{V}
$$

**(f)** With I1 = I2 = i and N1 = 4N2 the general fluxes become

$$
\phi_1 = \frac{(3N_1-N_2)i}{7r} = \frac{11N_2 i}{7r},\qquad \phi_2 = \frac{(5N_2-N_1)i}{7r} = \frac{N_2 i}{7r}
$$

$$
\lambda_1 = N_1\phi_1 = \frac{44N_2^2 i}{7r},\qquad \lambda_2 = N_2\phi_2 = \frac{N_2^2 i}{7r}\quad\Rightarrow\quad \frac{v_1}{v_2} = 44
$$

r and N2 cancel, so v1 = 97.78 sin ωt V and v2 = 2.22 sin ωt V for any g and A.

The typed text of the posted v2 PDF prints φ, λ and the inductances 10 times too small (for example L11 = 86.169 mH); the flux densities and the voltages are right.

## B3 · MT1 Fall 2024, Q3

**(a)** The coil MMF NI sits on the middle leg in series with the gap reluctance R\_gap (2g = 1 mm, area A2). The flux φ then splits equally into the two outer loops, φ/2 each. Each loop runs through about 2·L\_mean of ferrite with area A1, reluctance R\_core; the two loops are in parallel.

$$
R_{eq} = R_{gap} + R_{core}\parallel R_{core} = R_{gap} + \frac{R_{core}}{2}
$$

Because A2 = 2A1 and the middle leg carries φ while each outer leg carries φ/2, B is the same everywhere in the core.

**(b)**

$$
R_{gap} = \frac{2g}{\mu_0 A_2} = \frac{1\times10^{-3}}{4\pi\times10^{-7}\cdot 200\times10^{-6}} = 3.979\times10^{6}\ \text{H}^{-1}
$$

$$
R_{core} = \frac{2L_{mean}}{\mu_0\mu_r A_1} = \frac{2\cdot 53\times10^{-3}}{4\pi\times10^{-7}\cdot 1500\cdot 100\times10^{-6}} = 0.562\times10^{6}\ \text{H}^{-1}
$$

$$
R_{eq} = 3.979\times10^{6} + \frac{0.562\times10^{6}}{2} = 4.26\times10^{6}\ \text{H}^{-1},\qquad L = \frac{N^2}{R_{eq}} = \frac{20^2}{4.26\times10^{6}} = 93.9\ \mu\text{H}
$$

**(c)** 0.25 T < 0.3 T, so the core is linear.

$$
\Phi = B A_2 = 0.25\cdot 200\times10^{-6} = 0.05\ \text{mWb},\qquad I = \frac{\Phi R_{eq}}{N} = \frac{0.05\times10^{-3}\cdot 4.26\times10^{6}}{20} = 10.65\ \text{A}
$$

$$
H_{core} = \frac{B}{\mu_0\mu_r} = \frac{0.25}{4\pi\times10^{-7}\cdot 1500} = 132.6\ \text{A/m},\qquad H_{gap} = \frac{B}{\mu_0} = 198.9\ \text{kA/m}
$$

Check with the MMF law: 2(0.053)(132.6) + (10⁻³)(198 900) = 14.1 + 198.9 = 213 A·t = 20 · 10.65 A.

**(d)** 0.5 T is outside the linear region, so read the B-H curve: H\_core ≈ 1000 A/m at 500 mT. The gap stays linear: H\_gap = 0.5/μ0 = 397.9 kA/m.

$$
NI = 2L_{mean}H_{core} + 2g\,H_{gap} = 0.106\cdot 1000 + 10^{-3}\cdot 397900 = 106 + 398 = 504\ \text{A}\cdot\text{t}\quad\Rightarrow\quad I = 25.2\ \text{A}
$$

$$
L = \frac{N\Phi}{I} = \frac{20\cdot(0.5\cdot 200\times10^{-6})}{25.2} = 79.4\ \mu\text{H}
$$

The flux doubled but the current rose 2.37 times, so L dropped about 15% (93.9 → 79.4 μH). In practice a saturating inductor changes a filter's cut-off frequency, raises ripple current in a converter, and can let the current run away as L keeps falling.

**(e1)** From the core-loss curve: about 100 kW/m³ at 0.25 T and about 800 kW/m³ at 0.5 T. Core loss in (d) ≈ 800% of (c): 8 times larger for twice the flux density.

**(e2)** Copper loss is I²R:

$$
\frac{P_{cu,d}}{P_{cu,c}} = \left(\frac{25.2}{10.65}\right)^2 = 2.37^2 \approx 5.6\quad (560\%)
$$

**(e3)** Doubling B costs 8 times the core loss and 5.6 times the copper loss, which lowers efficiency and overheats the part. If more flux or current is needed, use a bigger core (or a thicker conductor) instead of pushing this core into saturation.

## B4 · MT1 Fall 2023, Q2

**(a)** The B-H characteristic is a vertical line: μ → ∞, so the iron has zero reluctance and only the gaps count. Every gap has the cross-section w · l\_z:

$$
R_x = \frac{x}{\mu_0 w l_z},\qquad R_y = \frac{y}{\mu_0 w l_z}
$$

Circuit: on the left, the source N1 i1 (left outer leg) has R\_y (left inner leg, carries φ1y) directly across it. On the right, the source N2 i2 (right outer leg) has R\_y (right inner leg, carries φ2y) across it. The two sides are joined by R\_x at the top and R\_x at the bottom, which carry the flux crossing between the cores (φ1x, φ2x). The two MMFs act in the same direction around the outer loop.

**(b)** With i2 = 0, the right outer leg is plain iron with zero MMF, so it shorts the right R\_y. Coil 1 then sees R\_y in parallel with the two R\_x in series:

$$
\phi_1 = N_1 i_1\left(\frac{1}{R_y} + \frac{1}{2R_x}\right)\quad\Rightarrow\quad L_{11} = \frac{N_1\phi_1}{i_1} = \frac{N_1^2}{R_y\parallel 2R_x},\qquad L_{22} = \frac{N_2^2}{R_y\parallel 2R_x}
$$

Only the flux through 2R\_x links coil 2:

$$
\phi_{2}\big|_{i_2=0} = \frac{N_1 i_1}{2R_x}\quad\Rightarrow\quad L_{21} = \frac{N_2\phi_2}{i_1} = \frac{N_1N_2}{2R_x} = L_{12}
$$

Split view: L11 = N1²/R\_y + N1²/(2R\_x) = leakage + magnetizing inductance.

**(c)**

$$
e_2 = N_2\frac{d\phi_2}{dt} = N_2\frac{d}{dt}\left(\frac{N_1 i_1}{2R_x}\right) = \frac{N_1N_2\,\mu_0 w l_z}{2}\,\frac{d}{dt}\left(\frac{i_1}{x}\right)
$$

Two ways to get e2 ≠ 0:

1. Drive coil 1 with a time-varying (AC) current i1 at fixed x: transformer action.
2. Keep i1 constant (DC) and vary the gap x in time (move the cores): the reluctance, and so the mutual flux, changes.

e2 = L12 di1/dt is valid only when x is constant.

**(d)**

| Component | Value | Flux it represents |
| --- | --- | --- |
| R1, R2 (winding resistances) | 0, shorted | none (coil resistance ignored) |
| X\_l1 (primary leakage) | N1²/R\_y, finite | φ1y (links coil 1 only) |
| X\_l2 (secondary leakage) | N2²/R\_y, finite | φ2y (links coil 2 only) |
| R\_c (core-loss resistance) | ∞, open | none: non-conductive core, no hysteresis, so no core loss |
| X\_m (magnetizing) | N1²/(2R\_x) referred to primary, finite | φ1x, φ2x (mutual flux crossing the x gaps) |

Dots: on the terminals where the currents i1 and i2 drive aiding flux in the outer loop (top of each winding). Draw i2 entering the dotted terminal of the secondary, as the coil current is defined in the figure.

## B5 · MT1 Fall 2021, Q2

**(a)** Mean path and cross-section of the toroid:

$$
l_c = \pi\,\frac{24+12}{2}\ \text{mm} = 18\pi\ \text{mm} = 56.55\ \text{mm},\qquad A_c = \frac{24-12}{2}\cdot 6 = 36\ \text{mm}^2 = 36\times10^{-6}\ \text{m}^2
$$

$$
R = \frac{l_c}{\mu_0\mu_r A_c} = \frac{18\pi\times10^{-3}}{4\pi\times10^{-7}\cdot 25000\cdot 36\times10^{-6}} = 5\times10^{4}\ \text{H}^{-1},\qquad L = \frac{N^2}{R} = \frac{625}{5\times10^{4}} = 12.5\ \text{mH}
$$

**(b)** Saturation flux Φ\_sat = B\_sat A\_c:

$$
N I_{max} = B_{sat}A_c R\quad\Rightarrow\quad I_{max} = \frac{1.2\cdot 36\times10^{-6}\cdot 5\times10^{4}}{25} = 86.4\ \text{mA}
$$

A high-μ core without a gap saturates at a very small current.

**(c)** Common mode: each winding carries I in the same sense (total 2I from a to b), so the MMFs add.

$$
\Phi = \frac{2NI}{R},\qquad \lambda = N\Phi = \frac{2N^2 I}{R}\ \text{(the windings are in parallel)},\qquad L_{eq} = \frac{\lambda}{2I} = \frac{N^2}{R} = 12.5\ \text{mH}
$$

$$
|Z_{eq}| = \omega L_{eq} = 2\pi\cdot 400\times10^{3}\cdot 12.5\times10^{-3} = 31.4\ \text{k}\Omega
$$

**(d)** Differential mode: the same current goes out through one winding and returns through the other, so the two MMFs cancel.

$$
NI - NI = \Phi R = 0\quad\Rightarrow\quad \Phi = 0,\ \lambda = 0,\qquad L_{eq} = 0,\quad Z_{eq} = 0
$$

The choke is a mode-selective filter. It shows a high impedance (31.4 kΩ at 400 kHz, rising with frequency) to common-mode noise, but no impedance to the differential power current, so it removes noise without affecting power delivery. Since the load-current MMFs cancel, the core does not saturate under load.

# Part C · Single-phase transformers

## C1 · MT1 Fall 2023, Q3

**(a)** Refer the secondary to the primary with a² = 150² = 22500 and move the shunt branch (R\_c ∥ jX\_m) to the primary terminals. The series branch becomes one equivalent impedance:

$$
R_{eq} = R_1 + a^2R_2 = 18 + 22500(0.0008) = 36\ \Omega,\qquad X_{eq} = X_1 + a^2X_2 = 36 + 22500(0.0016) = 72\ \Omega
$$

Circuit: V1 → \[R\_c = 245 kΩ ∥ jX\_m = j70 kΩ across V1\] → 36 + j72 Ω in series → V2′ = aV2.

**(b)** Referred quantities, with V2′ as reference:

$$
V_2' = 150\cdot 230 = 34500\angle 0^\circ\ \text{V},\qquad I_2' = \frac{1500}{150}\angle -37^\circ = 10\angle -37^\circ\ \text{A}
$$

$$
V_1 = V_2' + I_2'(R_{eq}+jX_{eq}) = 34500 + 10\angle -37^\circ\cdot 80.5\angle 63.43^\circ = 34500 + 805\angle 26.43^\circ
$$

$$
V_1 = 35220.8 + j358.4 = 35.22\angle 0.58^\circ\ \text{kV}
$$

**(c)** Phasors: V2′ along the reference axis; I2′ at −37°; then I2′R\_eq parallel to I2′ and I2′jX\_eq perpendicular to it (90° ahead) added at the tip of V2′; V1 closes the triangle at +0.58°.

Waveforms (50 Hz, period 20 ms):

- v2′(t): peak √2 · 34.5 = 48.79 kV, reference.
- v1(t): peak √2 · 35.22 = 49.81 kV, leads v2′ by 0.58° ≈ 0.03 ms.
- i2′(t): peak 10√2 = 14.14 A, lags v2′ by 37° ≈ 2.06 ms.

**(d)**

$$
P_{core} = \frac{V_1^2}{R_c} = \frac{35222.6^2}{245000} = 5.06\ \text{kW},\qquad P_{cu} = I_2'^2R_{eq} = 10^2\cdot 36 = 3.6\ \text{kW}
$$

$$
P_{out} = 230\cdot 1500\cdot 0.8 = 276\ \text{kW},\qquad \eta = \frac{276}{276 + 5.06 + 3.6} = 96.96\%
$$

**(e)** Yes, it rises. At unity power factor the same 276 kW needs only I2 = 276000/230 = 1200 A instead of 1500 A, so the copper loss falls with I² (to 64% of before). The series voltage drop is also smaller, so V1 and the core loss fall slightly. P\_out is the same and the losses are lower, so η increases (to about 97.4%).

**(f)** X\_m = ωL\_m. L\_m depends on the core geometry and material, so it stays about the same and X\_m rises with frequency: X\_m ≈ 1.2 · 70 = 84 kΩ.

R\_c models the core loss. At constant V, V = 4.44 f N Φ\_max, so the peak flux density falls to 50/60 of its old value:

- Eddy-current loss ∝ f²B² = (fB)² stays the same.
- Hysteresis loss ∝ f·B^n with n ≈ 1.6–2 falls, because B drops faster than f rises in this product.

So the core loss falls slightly and R\_c = V²/P\_core rises slightly. The printed key says the losses rise and R\_c falls. That holds only if B stayed the same, which a fixed terminal voltage does not allow.

## C2 · MT2 Fall 2024, Q1

Rated currents: I\_HV = 20000/2000 = 10 A, I\_LV = 20000/200 = 100 A. Turns ratio a = 10.

**(a)** The OC test needs rated voltage. The source gives at most 200 V, so it must be done from the **LV side** at 200 V (the HV side would need 2000 V). Refer the shunt branch to the LV side (divide by a² = 100):

$$
R_{c,LV} = \frac{12500}{100} = 125\ \Omega,\qquad X_{m,LV} = \frac{2000}{100} = 20\ \Omega
$$

$$
I_c = \frac{200}{125} = 1.6\ \text{A},\quad I_m = \frac{200}{20} = 10\ \text{A},\quad I_{oc} = \sqrt{1.6^2+10^2} = 10.13\ \text{A},\quad P_{oc} = \frac{200^2}{125} = 320\ \text{W}
$$

OC test: 200 V, 10.13 A, 320 W (the current is just above the 10 A source limit).

**(b)** The SC test needs rated current: 10 A on the HV side is within the source limit (100 A on the LV side is not), and 5.6% of 2000 V = 112 V < 200 V. So do it from the **HV side**:

$$
|Z_{eq,HV}| = \frac{112}{10} = 11.2\ \Omega,\qquad R_{eq,HV} = \frac{500}{10^2} = 5\ \Omega,\qquad X_{eq,HV} = \sqrt{11.2^2-5^2} = 10.02\ \Omega
$$

In the figure r\_eq and x\_eq are on the LV side, so divide by a² = 100:

$$
r_{eq} = 0.05\ \Omega,\qquad x_{eq} = 0.1002\ \Omega
$$

**(c)** Maximum efficiency occurs when copper loss = core loss. Core loss at rated voltage = 320 W; full-load copper loss = 500 W.

$$
x^2\cdot 500 = 320\quad\Rightarrow\quad x = \sqrt{0.64} = 0.8\quad\Rightarrow\quad S = 0.8\cdot 20 = 16\ \text{kVA}
$$

The highest value comes at unity power factor (largest output for the same losses):

$$
\eta_{max} = \frac{16000}{16000 + 320 + 320} = 96.15\%\quad\text{at } P = 16\ \text{kW},\ pf = 1
$$

**(d)** At rated voltage the core reaches B\_max = 1.6 T:

$$
V = 4.44\,f N B_{max} A\quad\Rightarrow\quad N_{HV} = \frac{2000}{4.44\cdot 50\cdot 1.6\cdot 0.01} = 563\ \text{turns},\qquad N_{LV} = \frac{200}{3.552} = 56.3 \approx 56\ \text{turns}
$$

**(e)** X\_m gives the magnetizing inductance, and the B-H slope gives μ:

$$
L_m = \frac{X_m}{\omega} = \frac{2000}{100\pi} = 6.366\ \text{H (HV side)},\qquad \mu = \frac{1.6}{320} = 5\times10^{-3}\ \text{H/m}
$$

$$
R = \frac{N_{HV}^2}{L_m} = \frac{563.06^2}{6.366} = 4.98\times10^{4}\ \text{H}^{-1},\qquad l_m = R\,\mu A = 4.98\times10^{4}\cdot 5\times10^{-3}\cdot 0.01 = 2.49\ \text{m}
$$

Check: at 2000 V the magnetizing current is 1 A RMS (1.414 A peak), and N\_HV · 1.414 = 796 A·t = 320 A/m · 2.49 m. (With the fallback N\_LV = 100, so N\_HV = 1000: l\_m = 7.85 m.)

## C3 · MT1 Fall 2022, Q3

**Part 1 (a)** X1 ≫ X2. A leakage inductance is N²/R\_leak for a leakage path of similar geometry, so

$$
X_1 \propto \frac{N_1^2}{R_\ell},\quad X_2 \propto \frac{N_2^2}{R_\ell}\quad\Rightarrow\quad X_1 \approx \left(\frac{N_1}{N_2}\right)^2 X_2
$$

Referred to the same side they are comparable.

**Part 1 (b)** The ideal transformer gives e1/e2 = N1/N2. The terminal ratio equals it only if there is no series voltage drop:

- R1 = R2 = 0: no winding resistance, so no ohmic drop (and no copper loss).
- X1 = X2 = 0: no leakage flux, so all flux links both windings.

R\_c and X\_m are across e1, so they do not change the ratio by themselves. They matter only through the exciting current's drop on R1 and X1, which is zero once R1 = X1 = 0.

**Part 1 (c)** R\_c is affected. Loop 2 has a larger area, so the hysteresis energy per cycle (and the core loss) increases. Since P\_core = E²/R\_c at the same voltage, **R\_c decreases**. X\_m stays about the same because both materials reach 1.5 T at the same 300 A/m peak field, so the magnetizing current is about the same.

**Part 2.** RMS phasors (divide peaks by √2):

$$
V_1 = 121.09\angle 10.66^\circ\ \text{V},\quad I_1 = 8.273\angle -0.5^\circ\ \text{A},\quad V_2 = 230.02\angle 0^\circ\ \text{V},\quad I_2 = 4.002\angle 0^\circ\ \text{A}
$$

**(a)** The primary and secondary power factors differ, so use each side's own angle:

$$
P_{in} = 121.09\cdot 8.273\cos(10.66^\circ+0.5^\circ) = 982.9\ \text{W},\qquad P_{out} = 230.02\cdot 4.002 = 920.6\ \text{W}
$$

$$
\eta = \frac{920.6}{982.9} = 93.7\%
$$

**(b)** a = 115/230 = 0.5. With the shunt branch at the primary terminals, the series branch carries I2′:

$$
R_{eq} = R_1 + a^2R_2 = 0.25 + 0.25(1) = 0.5\ \Omega,\qquad I_2' = \frac{I_2}{a} = 8.004\ \text{A}
$$

$$
P_{cu} = I_2'^2R_{eq} = 8.004^2\cdot 0.5 = 32.0\ \text{W},\qquad P_{core} = P_{in} - P_{out} - P_{cu} = 982.9 - 920.6 - 32.0 = 30.2\ \text{W}
$$

**(c)**

$$
R_c = \frac{V_1^2}{P_{core}} = \frac{121.09^2}{30.23} = 485\ \Omega
$$

**(d)** Referred to the primary, V2′ = aV2 = 115∠0° V and I2′ = 8.0∠0° A are in phase. V1 = V2′ + I2′(R\_eq + jX\_eq), so the jX\_eq I2′ drop is the whole vertical part of V1:

$$
X_{eq}I_2' = |V_1|\sin 10.66^\circ\quad\Rightarrow\quad X_{eq} = \frac{121.09\cdot 0.1850}{8.004} = 2.80\ \Omega
$$

Check: (V1 − V2′)/I2′ = 0.499 + j2.80 Ω; the 0.499 Ω real part matches R\_eq = 0.5 Ω.

**(e)** With X\_eq = 0 the primary voltage only needs to cover the resistive drop:

$$
V_{1,new} = V_2' + I_2'R_{eq} = 115.01 + 8.004\cdot 0.5 = 119.0\ \text{V},\qquad P_{core,new} = \frac{119.0^2}{485} = 29.2\ \text{W}
$$

$$
\eta_{new} = \frac{920.6}{920.6 + 32.0 + 29.2} = 93.8\%
$$

X\_eq absorbs no active power, so P\_out and P\_cu are unchanged. It only raises the primary voltage needed, and with it the core loss V1²/R\_c. Removing it lowers the core loss slightly and raises η slightly (93.7% → 93.8%). Its main effect is on voltage regulation, not efficiency.

**(f)** No. All four waveforms are pure 50 Hz sinusoids. A saturated core would draw a peaky, non-sinusoidal (harmonic-rich) exciting current, which would show up in i1.

## C4 · MT2 Fall 2023, Q1

**Part I**

| # | T/F | Explanation |
| --- | --- | --- |
| 1 | F | Skin effect pushes AC current to the conductor surface, so the AC resistance rises with frequency. |
| 2 | F | Laminations cut the eddy-current paths, so they reduce eddy-current loss. Hysteresis loss is reduced by the material (e.g. silicon steel, a narrow loop). |
| 3 | F | A gap adds reluctance, which raises the magnetizing current (lowers X\_m). Transformer cores are built with as small gaps as possible. |
| 4 | F | If the core saturates, the magnetizing current is non-sinusoidal and contains higher harmonics. |
| 5 | F | Copper is a good conductor but μr ≈ 1 (slightly diamagnetic); it is not ferromagnetic. |

**Part II.** I2′ lags V2′ by less than 90°, so the load is resistive-inductive. |V1| > |V2′| because of the R\_eq and jX\_eq drops.

1. **Positive** active power (angle between V2′ and I2′ below 90°).
2. **Positive** reactive power (the current lags).
3. **Positive** regulation (|V1| > |V2′|, so the no-load voltage is higher than the loaded one).
4. **Lagging** at the primary (V1 leads I2′ by even more than V2′ does).
5. **Lagging** at the secondary.
6. **Resistive losses**: R\_eq is the only lossy element; the circuit has no shunt (core) branch.

**Part III (a)** Rated currents: I\_HV = 10000/2500 = 4 A, I\_LV = 10000/250 = 40 A.

- OC test: **LV side**. It was done at 250 V, the rated LV voltage (OC tests need rated voltage, normally from the low-voltage side).
- SC test: **HV side**. It was done at 4 A, the rated HV current (SC tests need rated current, normally from the low-current HV side).

**(b)** From the SC test (HV side), then refer to LV with a = 10:

$$
|Z_{eq}| = \frac{80}{4} = 20\ \Omega,\qquad R_{eq} = \frac{80}{4^2} = 5\ \Omega,\qquad X_{eq} = \sqrt{20^2-5^2} = 19.36\ \Omega
$$

$$
Z_{eq,LV} = \frac{5 + j19.36}{10^2} = 0.05 + j0.1936\ \Omega
$$

**(c)** From the OC test (already on the LV side, no referring needed):

$$
R_c = \frac{250^2}{100} = 625\ \Omega,\qquad I_c = \frac{250}{625} = 0.4\ \text{A},\qquad I_m = \sqrt{0.5^2-0.4^2} = 0.3\ \text{A},\qquad X_m = \frac{250}{0.3} = 833.3\ \Omega
$$

**(d)** Half rated power to a resistive load at 250 V: I2 = 5000/250 = 20 A, in phase with V2. Shunt branch at the input terminals, LV side:

$$
V_1' = 250 + 20(0.05 + j0.1936) = 251 + j3.87\ \text{V},\qquad |V_1'| = 251.03\ \text{V}
$$

$$
P_{core} = \frac{251.03^2}{625} = 100.8\ \text{W},\qquad P_{cu} = 20^2\cdot 0.05 = 20\ \text{W}
$$

$$
\eta = \frac{5000}{5000 + 20 + 100.8} = 97.64\%
$$
