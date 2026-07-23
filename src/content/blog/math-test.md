---
title: "LaTeX Stress Test: Matrices and Overflow"
date: 2026-07-23
description: "Verifying matrix block rendering and horizontal overflow scrolling for long mathematical equations."
tags: ["Math", "LaTeX", "Testing"]
---

# Advanced LaTeX Verification

This post isolates the two specific mathematical formatting challenges that were previously breaking in the pipeline: multi-line matrix arrays and container overflow.

---

## 1. Matrix & Vector Space Algebra

This section verifies that double backslashes (`\\`) are safely passed from the Markdown AST directly to KaTeX without being stripped by regex or escape sequences.

### 3x3 Matrix (pmatrix)
$$A = \begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{pmatrix}$$

### Column Vectors (bmatrix)
$$\mathbf{x} = \begin{bmatrix} x_1 \\ x_2 \\ x_3 \end{bmatrix}, \quad \mathbf{b} = \begin{bmatrix} b_1 \\ b_2 \\ b_3 \end{bmatrix}$$

### Determinant Expansion
$$\text{Det}(A) = a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33} - a_{23}a_{31}) + a_{13}(a_{21}a_{32} - a_{22}a_{31})$$

---

## 2. Horizontal Overflow Scrolling Verification

The equation below is intentionally massive. If you shrink your browser window to simulate a mobile phone, this math block **must not** break outside of the gray card boundary. 

Instead, a horizontal scrollbar should appear exclusively under the equation, thanks to the `.prose .katex-display { overflow-x: auto; }` rule in your CSS.

$$\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi} \implies \prod_{k=1}^{\infty} \left( 1 - \frac{1}{4k^2} \right) = \frac{2}{\pi} \implies \left[ \frac{\partial \mathcal{L}}{\partial q} - \frac{d}{dt} \left( \frac{\partial \mathcal{L}}{\partial \dot{q}} \right) \right] + \oint_{\partial \Sigma} \mathbf{F} \cdot d\mathbf{r} = \iint_{\Sigma} (\nabla \times \mathbf{F}) \cdot d\mathbf{S} + \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^n$$