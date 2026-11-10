Fig. E1.a shows a magnetic core with a **0.2 mm air gap** and **three coils**. The core has a cross-sectional area of $20\ \mathrm{cm^2}$ and a mean magnetic path length of $50\ \mathrm{cm}$. The core's magnetization curve is given in Fig. E1.b.

Determine the number of turns $N_C$ of coil C needed to create a magnetic flux of $3.5\ \mathrm{mWb}$.

Assume $\mu_0 = 10^{-6}\ \mathrm{H/m}$. Neglect leakage flux and fringing at the air gap, and take the core and the gap to have the same cross-sectional area. Use the winding senses and current directions in the figure to decide whether the coil MMFs aid or oppose one another.

> **Data from the figure** (as used in the official solution; check it on the original page): coil A has $N_A = 250$, $I_A = 2\ \mathrm A$; coil B has $N_B = 100$, $I_B = 1.25\ \mathrm A$ and its MMF **opposes** coil A; coil C carries $I_C = 1\ \mathrm A$ and aids coil A. Around $1.75\ \mathrm T$ the magnetization curve follows $B = 1.4 + H$ ($B$ in T, $H$ in kA/m).

<!-- solution -->

**1. Flux density.** The core and the gap have the same area, so

$$B_{core} = B_{gap} = \frac{\Phi}{A} = \frac{3.5\times10^{-3}}{20\times10^{-4}} = 1.75\ \mathrm T$$

**2. Core field intensity.** 1.75 T lies on the second segment of the curve, $B = 1.4 + H$:

$$H_{core} = 1.75 - 1.4 = 0.35\ \mathrm{kA/m} = 350\ \mathrm{A/m}$$

**3. Gap field intensity.**

$$H_{gap} = \frac{B}{\mu_0} = \frac{1.75}{10^{-6}} = 1.75\times10^{6}\ \mathrm{A/m}$$

**4. MMF law around the loop** (coil B opposes):

$$N_A I_A - N_B I_B + N_C I_C = H_{core}\,l_{core} + H_{gap}\,l_{gap}$$

$$250(2) - 100(1.25) + N_C(1) = 350(0.5) + 1.75\times10^{6}\,(0.2\times10^{-3}) = 175 + 350 = 525\ \mathrm{A\cdot t}$$

**5. Result.**

$$N_C = 525 - 500 + 125 = \boxed{150\ \text{turns}}$$

The 0.2 mm gap needs twice the MMF of the 50 cm of iron, which is why the gap usually dominates the magnetic circuit.
