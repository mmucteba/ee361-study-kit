Fig. E3.a shows a core with infinite permeability and **three parallel air gaps** of lengths $2g$, $g$ and $g/2$. Each branch has cross-sectional area $A$. Coil $N_1$ is wound on the $2g$ branch and coil $N_2$ on the $g$ branch; the $g/2$ branch has no coil. Neglect leakage and fringing, and use the winding senses and reference polarities of Fig. E3.a.

Given $N_1 = 400$, $N_2 = 100$, $g = 0.1\ \mathrm{mm}$, $A = 10\ \mathrm{cm^2}$, $\mu_0 = 4\pi\times10^{-7}\ \mathrm{H/m}$. Find:

- **a)** the signed flux density in each gap and the flux linkage of each coil when only $I_1$ flows;
- **b)** the same quantities when only $I_2$ flows;
- **c)** the flux densities and flux linkages when both currents flow;
- **d)** the two self-inductances and the signed mutual inductance;
- **e)** for the series connection of Fig. E3.b, with $v(t) = 100\sin(\omega t)\ \mathrm V$ and zero coil resistance, the induced voltages $v_1(t)$ and $v_2(t)$.

> **Data from the figure** (as used in the official solution): both coils have the same winding sense and upward flux is positive in each gap, so $\lambda_1 = N_1\phi_1$ and $\lambda_2 = N_2\phi_2$. In Fig. E3.b, $i_1 = i_2 = i$ and $v = v_1 + v_2$.

<!-- solution -->

**Setup.** $r = \dfrac{g}{\mu_0 A} = \dfrac{0.1\times10^{-3}}{4\pi\times10^{-7}\cdot10\times10^{-4}} = 7.958\times10^{4}\ \mathrm{A\cdot t/Wb}$, so $\dfrac{1}{7r} = 1.7952\times10^{-6}\ \mathrm{Wb/(A\cdot t)}$.

The same equations as Example 2 give

$$\phi_1 = \frac{3N_1I_1 - N_2I_2}{7r},\qquad \phi_2 = \frac{-N_1I_1 + 5N_2I_2}{7r},\qquad \phi_3 = \frac{-2N_1I_1 - 4N_2I_2}{7r},\qquad B_k = \frac{\phi_k}{A}$$

**a) Only $I_1$.** $\phi_1 = 2.1542\times10^{-3}I_1$, $\phi_2 = -7.1808\times10^{-4}I_1$, $\phi_3 = -1.4362\times10^{-3}I_1$ Wb

$$B_1 = 2.1542\,I_1,\quad B_2 = -0.71808\,I_1,\quad B_3 = -1.4362\,I_1\ \mathrm T;\qquad \lambda_1 = 0.86169\,I_1,\quad \lambda_2 = -0.071808\,I_1\ \mathrm{Wb\cdot t}$$

**b) Only $I_2$.** $\phi_1 = -1.7952\times10^{-4}I_2$, $\phi_2 = 8.9760\times10^{-4}I_2$, $\phi_3 = -7.1808\times10^{-4}I_2$ Wb

$$B_1 = -0.17952\,I_2,\quad B_2 = 0.8976\,I_2,\quad B_3 = -0.71808\,I_2\ \mathrm T;\qquad \lambda_1 = -0.071808\,I_2,\quad \lambda_2 = 0.08976\,I_2\ \mathrm{Wb\cdot t}$$

**c) Both currents** (superposition):

$$B_1 = 2.1542I_1 - 0.17952I_2,\quad B_2 = -0.71808I_1 + 0.8976I_2,\quad B_3 = -1.4362I_1 - 0.71808I_2\ \mathrm T$$

$$\lambda_1 = 0.86169I_1 - 0.071808I_2,\qquad \lambda_2 = -0.071808I_1 + 0.08976I_2\ \mathrm{Wb\cdot t}$$

**d) Inductances.** From $\lambda_1 = L_{11}I_1 + MI_2$ and $\lambda_2 = MI_1 + L_{22}I_2$:

$$L_{11} = \boxed{861.69\ \mathrm{mH}},\qquad L_{22} = \boxed{89.76\ \mathrm{mH}},\qquad M = \boxed{-71.808\ \mathrm{mH}}$$

$M$ is the same both ways (reciprocity). It is negative because the flux each coil pushes through the other coil's gap points against that coil's positive linkage direction.

**e) Series connection.** $\lambda_1 = (L_{11} + M)\,i = 0.78988\,i$, $\ \lambda_2 = (M + L_{22})\,i = 0.017952\,i$, ratio $44$:

$$v_1(t) = \boxed{97.78\sin(\omega t)\ \mathrm V},\qquad v_2(t) = \boxed{2.22\sin(\omega t)\ \mathrm V}$$

the same as Example 2.

> **Check against the file:** the typed text in the v2 PDF prints $\phi$, $\lambda$ and the inductances **10× too small** (for example $L_{11} = 86.169$ mH, $M = -7.1808$ mH). The flux densities and part (e) are right. All numbers above were recomputed.
