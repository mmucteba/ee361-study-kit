Fig. E2 shows a magnetic core with **three air gaps** of lengths $2g$, $g$ and $g/2$. The core has infinite permeability and all three limbs have the same cross-sectional area $A$. Coil $N_1$ is wound on the limb with the $2g$ gap and coil $N_2$ on the limb with the $g$ gap; the $g/2$ gap has no coil.

The coils are connected **in series** with $N_1/N_2 = 4$, and a source voltage $v(t) = 100\sin(\omega t)\ \mathrm V$ is applied across the series-connected coils. The coils have zero resistance.

Treat the three gaps as parallel magnetic branches between common, infinitely permeable core sections. Neglect leakage and fringing, and use the winding senses and voltage reference polarities shown.

Determine the induced voltages $v_1(t)$ and $v_2(t)$.

> **Data from the figure** (as used in the official solution): take upward flux in each gap as positive. Then $\lambda_1 = N_1\phi_1$, $\lambda_2 = N_2\phi_2$, the same current $i$ flows in both coils, and $v = v_1 + v_2$.

<!-- solution -->

**1. Reluctances.** With $r = \dfrac{g}{\mu_0 A}$:

$$\mathcal R_1 = 2r\ (2g),\qquad \mathcal R_2 = r\ (g),\qquad \mathcal R_3 = \tfrac{r}{2}\ (g/2)$$

**2. Equations.** Flux continuity at the core node and the MMF law around the two windows:

$$\phi_1 + \phi_2 + \phi_3 = 0,\qquad 2r\,\phi_1 - \tfrac r2\,\phi_3 = N_1 i,\qquad r\,\phi_2 - \tfrac r2\,\phi_3 = N_2 i$$

**3. Solve.**

$$\phi_1 = \frac{(3N_1 - N_2)\,i}{7r},\qquad \phi_2 = \frac{(5N_2 - N_1)\,i}{7r},\qquad \phi_3 = -\frac{(2N_1 + 4N_2)\,i}{7r}$$

With $N_1 = 4N_2$: $\ \phi_1 = \dfrac{11N_2\,i}{7r}$, $\ \phi_2 = \dfrac{N_2\,i}{7r}$.

**4. Flux linkages.**

$$\lambda_1 = N_1\phi_1 = \frac{44N_2^2\,i}{7r},\qquad \lambda_2 = N_2\phi_2 = \frac{N_2^2\,i}{7r}\quad\Rightarrow\quad \frac{v_1}{v_2} = \frac{d\lambda_1/dt}{d\lambda_2/dt} = 44$$

**5. Split the source voltage.** $v_1 + v_2 = v$:

$$v_1(t) = \tfrac{44}{45}\,v = \boxed{97.78\sin(\omega t)\ \mathrm V},\qquad v_2(t) = \tfrac{1}{45}\,v = \boxed{2.22\sin(\omega t)\ \mathrm V}$$

The split depends only on the ratio of the flux linkages, so $\omega$, $g$ and $A$ never enter.
