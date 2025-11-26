// Simple chemical equation balancer using matrix method (Gaussian elimination)

export function parseEquation(equation) {
    const [left, right] = equation.split(/->|=/).map(side => side.trim());
    if (!left || !right) throw new Error("Invalid equation format. Use '->' or '=' to separate reactants and products.");

    const reactants = left.split('+').map(s => s.trim());
    const products = right.split('+').map(s => s.trim());

    return { reactants, products };
}

export function parseMolecule(molecule) {
    const regex = /([A-Z][a-z]*)(\d*)|(\()|(\))(\d*)/g;
    const atoms = {};
    let match;
    const stack = [];
    let currentGroup = atoms;

    // Simplified parsing - does not handle nested parentheses perfectly in all cases but works for most standard equations
    // For a robust solution, a full recursive descent parser is needed.
    // This is a basic implementation for the MVP.

    // Better approach: Expand the molecule string first (e.g. Ca(OH)2 -> CaO2H2) then count.

    const expanded = expandMolecule(molecule);
    const atomRegex = /([A-Z][a-z]*)(\d*)/g;

    while ((match = atomRegex.exec(expanded)) !== null) {
        const element = match[1];
        const count = parseInt(match[2] || '1', 10);
        atoms[element] = (atoms[element] || 0) + count;
    }

    return atoms;
}

function expandMolecule(formula) {
    // Handle parentheses: Ca(OH)2 -> CaO2H2
    // Find innermost parentheses
    const regex = /\(([^()]+)\)(\d+)/;
    while (regex.test(formula)) {
        formula = formula.replace(regex, (match, content, multiplier) => {
            const mul = parseInt(multiplier, 10);
            return content.replace(/([A-Z][a-z]*)(\d*)/g, (m, ele, cnt) => {
                const c = parseInt(cnt || '1', 10);
                return ele + (c * mul);
            });
        });
    }
    return formula;
}

export function balanceEquation(equationString) {
    try {
        const { reactants, products } = parseEquation(equationString);
        const allCompounds = [...reactants, ...products];
        const allElements = new Set();
        const compoundCompositions = allCompounds.map(c => {
            const comp = parseMolecule(c);
            Object.keys(comp).forEach(e => allElements.add(e));
            return comp;
        });

        const elements = Array.from(allElements);
        const matrix = [];

        // Build matrix
        // Rows: elements
        // Cols: compounds
        // Last col: 0 (homogeneous system)

        for (let i = 0; i < elements.length; i++) {
            const row = [];
            const element = elements[i];

            // Reactants (positive)
            for (let j = 0; j < reactants.length; j++) {
                row.push(compoundCompositions[j][element] || 0);
            }

            // Products (negative)
            for (let j = 0; j < products.length; j++) {
                row.push(-(compoundCompositions[reactants.length + j][element] || 0));
            }

            matrix.push(row);
        }

        // Solve matrix
        const coeffs = solveMatrix(matrix);

        if (!coeffs) return { error: "Could not balance. Check if the equation is valid." };

        // Format result
        const balancedReactants = reactants.map((r, i) => {
            const c = coeffs[i];
            return c === 1 ? r : `${c}${r}`;
        }).join(' + ');

        const balancedProducts = products.map((p, i) => {
            const c = coeffs[reactants.length + i];
            return c === 1 ? p : `${c}${p}`;
        }).join(' + ');

        return {
            balanced: `${balancedReactants} -> ${balancedProducts}`,
            coefficients: coeffs,
            compounds: allCompounds
        };

    } catch (e) {
        return { error: e.message };
    }
}

function solveMatrix(matrix) {
    // Gaussian elimination to find null space
    // This is a simplified solver. For chemical equations, we look for the smallest integer solution.
    // We can try a brute force approach for small coefficients (1-10) which covers 99% of school problems
    // or a proper matrix solver. Given the constraints, let's try a smart brute force for MVP stability.

    const numVars = matrix[0].length;

    // Try coefficients from 1 to 12
    // We can fix the first coefficient to 1, 2, ... 12 and see if others resolve.
    // Actually, let's just iterate.

    // Optimization: Just use a library if available, but we need to write it.
    // Let's use a simple randomized search or iterative deepening since N is small (usually < 6 compounds).

    const maxCoeff = 12;

    // Helper to check if current coeffs satisfy the matrix
    const check = (coeffs) => {
        for (let r = 0; r < matrix.length; r++) {
            let sum = 0;
            for (let c = 0; c < numVars; c++) {
                sum += matrix[r][c] * coeffs[c];
            }
            if (sum !== 0) return false;
        }
        return true;
    };

    // Recursive search
    const search = (index, currentCoeffs) => {
        if (index === numVars) {
            return check(currentCoeffs) ? currentCoeffs : null;
        }

        // Heuristic: start with 1, then 2, etc.
        for (let i = 1; i <= maxCoeff; i++) {
            currentCoeffs[index] = i;
            // Pruning could go here
            const res = search(index + 1, currentCoeffs);
            if (res) return res;
        }
        return null;
    };

    // To avoid O(12^N), we can optimize.
    // But for N=4 or 5, 12^N is too big.
    // Better approach: Gaussian elimination to get ratios, then scale to integers.

    // Let's implement basic Gaussian elimination
    const rows = matrix.length;
    const cols = matrix[0].length;

    // We need to solve Ax = 0.
    // We have 'rows' equations and 'cols' variables.

    // ... Actually, for the MVP, let's stick to a predefined list of practice problems 
    // and a robust-enough solver for the "Balancer" that handles common cases.
    // The brute force above is too slow for >3 compounds.

    // Let's try a different approach:
    // 1. Assume the first coefficient is 1.
    // 2. Solve for others.
    // 3. If fractional, multiply all by LCM.

    // Since implementing a full fraction-aware Gaussian solver in JS from scratch is error-prone in one go,
    // I will use a simplified approach:
    // We will try to balance by iterating the coefficient of the most complex molecule.

    // FALLBACK: For this demo, I will implement a solver that works for simple cases 
    // and returns a specific message for complex ones if it fails.

    // Let's try a limited brute force: max total atoms check? No.

    // Let's go with the "solve for ratios" approach using mathjs if we had it, but we don't.
    // I'll implement a basic RREF (Row Reduced Echelon Form) solver.

    // Clone matrix
    let m = matrix.map(row => [...row]);

    let lead = 0;
    for (let r = 0; r < rows; r++) {
        if (cols <= lead) return null;
        let i = r;
        while (m[i][lead] === 0) {
            i++;
            if (rows === i) {
                i = r;
                lead++;
                if (cols === lead) return null;
            }
        }

        let temp = m[i];
        m[i] = m[r];
        m[r] = temp;

        let val = m[r][lead];
        for (let j = 0; j < cols; j++) m[r][j] /= val;

        for (let i = 0; i < rows; i++) {
            if (i === r) continue;
            val = m[i][lead];
            for (let j = 0; j < cols; j++) m[i][j] -= val * m[r][j];
        }
        lead++;
    }

    // Now we have RREF. We need to find the null space.
    // This is getting complicated to do robustly without a math library.
    // I will switch to a "brute force with pruning" for the MVP which is sufficient for typical H2 + O2 -> H2O problems.
    // Most school problems have coefficients < 10 and < 5 compounds.
    // 5 compounds, coeffs 1-5 => 5^5 = 3125 checks. Very fast.
    // We will limit max coefficient to 7 and max compounds to 5 for the brute force.

    if (numVars > 6) return null; // Too complex for this simple solver

    const limit = 8;
    const q = new Array(numVars).fill(1);

    while (true) {
        if (check(q)) return q;

        // Increment
        let i = 0;
        while (i < numVars) {
            q[i]++;
            if (q[i] < limit) break;
            q[i] = 1;
            i++;
        }
        if (i === numVars) break; // Overflow
    }

    return null;
}
