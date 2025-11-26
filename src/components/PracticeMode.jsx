import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, RefreshCw, Check, X, HelpCircle, Award, ArrowRight } from 'lucide-react';
import { balanceEquation } from '../utils/chemistry';

const PRACTICE_PROBLEMS = [
    { id: 1, equation: "H2 + O2 -> H2O", difficulty: "Easy" },
    { id: 2, equation: "N2 + H2 -> NH3", difficulty: "Easy" },
    { id: 3, equation: "CH4 + O2 -> CO2 + H2O", difficulty: "Medium" },
    { id: 4, equation: "Fe + O2 -> Fe2O3", difficulty: "Medium" },
    { id: 5, equation: "C3H8 + O2 -> CO2 + H2O", difficulty: "Medium" },
    { id: 6, equation: "Al + Fe2O3 -> Fe + Al2O3", difficulty: "Hard" },
    { id: 7, equation: "KClO3 -> KCl + O2", difficulty: "Medium" },
    { id: 8, equation: "Na + H2O -> NaOH + H2", difficulty: "Medium" },
];

const PracticeMode = () => {
    const [currentProblem, setCurrentProblem] = useState(null);
    const [userCoeffs, setUserCoeffs] = useState({});
    const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', null
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [badges, setBadges] = useState([]);

    useEffect(() => {
        loadNewProblem();
    }, []);

    const loadNewProblem = () => {
        const random = PRACTICE_PROBLEMS[Math.floor(Math.random() * PRACTICE_PROBLEMS.length)];
        setCurrentProblem(random);

        // Parse to get compounds for inputs
        const parts = random.equation.split(/->/).map(s => s.trim());
        const reactants = parts[0].split('+').map(s => s.trim());
        const products = parts[1].split('+').map(s => s.trim());

        const initialCoeffs = {};
        [...reactants, ...products].forEach((c, i) => initialCoeffs[`${c}-${i}`] = '');
        setUserCoeffs(initialCoeffs);
        setFeedback(null);
    };

    const handleCoeffChange = (key, value) => {
        if (value === '' || /^\d+$/.test(value)) {
            setUserCoeffs(prev => ({ ...prev, [key]: value }));
        }
    };

    const checkAnswer = () => {
        // Get the correct solution
        const solution = balanceEquation(currentProblem.equation);
        if (solution.error) {
            console.error("Error solving internal problem:", solution.error);
            return;
        }

        const correctCoeffs = solution.coefficients;
        const userValues = Object.values(userCoeffs).map(v => v === '' ? 1 : parseInt(v, 10));

        // Compare
        // Note: User might enter multiples (e.g. 2, 2 -> 2 instead of 1, 1 -> 1).
        // Ideally we simplify the user's ratio, but for MVP we check exact match or simple multiples.

        // Simple check: exact match
        const isCorrect = userValues.every((val, i) => val === correctCoeffs[i]);

        if (isCorrect) {
            setFeedback('correct');
            const newScore = score + (currentProblem.difficulty === 'Hard' ? 30 : currentProblem.difficulty === 'Medium' ? 20 : 10);
            setScore(newScore);
            setStreak(s => s + 1);

            // Check badges
            if (streak + 1 >= 3 && !badges.includes('Streak Master')) {
                setBadges([...badges, 'Streak Master']);
            }
            if (newScore >= 100 && !badges.includes('Chem Mastery')) {
                setBadges([...badges, 'Chem Mastery']);
            }
        } else {
            setFeedback('incorrect');
            setStreak(0);
        }
    };

    if (!currentProblem) return <div>Loading...</div>;

    const parts = currentProblem.equation.split(/->/).map(s => s.trim());
    const reactants = parts[0].split('+').map(s => s.trim());
    const products = parts[1].split('+').map(s => s.trim());

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg text-primary">
                        <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-muted">Total Score</p>
                        <p className="text-2xl font-bold">{score}</p>
                    </div>
                </div>
                <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-accent/20 rounded-lg text-accent">
                        <Star className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-muted">Current Streak</p>
                        <p className="text-2xl font-bold">{streak}</p>
                    </div>
                </div>
                <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-secondary/20 rounded-lg text-secondary">
                        <Award className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-muted">Badges</p>
                        <p className="text-sm font-bold">{badges.length > 0 ? badges.join(', ') : 'None yet'}</p>
                    </div>
                </div>
            </div>

            {/* Problem Area */}
            <div className="glass-panel p-8 rounded-2xl space-y-8">
                <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${currentProblem.difficulty === 'Easy' ? 'bg-success/20 text-success' :
                        currentProblem.difficulty === 'Medium' ? 'bg-warning/20 text-yellow-500' :
                            'bg-error/20 text-error'
                        }`}>
                        {currentProblem.difficulty}
                    </span>
                    <button
                        onClick={loadNewProblem}
                        className="text-sm text-muted hover:text-white flex items-center gap-1"
                    >
                        Skip <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 text-xl md:text-2xl font-mono">
                    {/* Reactants */}
                    {reactants.map((r, i) => (
                        <React.Fragment key={`r-${i}`}>
                            {i > 0 && <span className="text-muted">+</span>}
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={userCoeffs[`${r}-${i}`] || ''}
                                    onChange={(e) => handleCoeffChange(`${r}-${i}`, e.target.value)}
                                    className={`w-12 h-12 text-center bg-background/50 border rounded-lg focus:outline-none focus:ring-2 transition-all ${feedback === 'correct' ? 'border-success text-success' :
                                        feedback === 'incorrect' ? 'border-error text-error' :
                                            'border-white/10 focus:ring-primary/50'
                                        }`}
                                    placeholder="1"
                                />
                                <span className="font-bold">{r}</span>
                            </div>
                        </React.Fragment>
                    ))}

                    <ArrowRight className="w-6 h-6 text-muted mx-2" />

                    {/* Products */}
                    {products.map((p, i) => (
                        <React.Fragment key={`p-${i}`}>
                            {i > 0 && <span className="text-muted">+</span>}
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={userCoeffs[`${p}-${reactants.length + i}`] || ''}
                                    onChange={(e) => handleCoeffChange(`${p}-${reactants.length + i}`, e.target.value)}
                                    className={`w-12 h-12 text-center bg-background/50 border rounded-lg focus:outline-none focus:ring-2 transition-all ${feedback === 'correct' ? 'border-success text-success' :
                                        feedback === 'incorrect' ? 'border-error text-error' :
                                            'border-white/10 focus:ring-primary/50'
                                        }`}
                                    placeholder="1"
                                />
                                <span className="font-bold">{p}</span>
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-4 pt-4">
                    <button
                        onClick={checkAnswer}
                        disabled={feedback === 'correct'}
                        className={`btn-primary flex items-center gap-2 ${feedback === 'correct' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Check Answer
                    </button>

                    {feedback === 'correct' && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={loadNewProblem}
                            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-bold transition-all flex items-center gap-2"
                        >
                            Next Problem <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    )}
                </div>

                {/* Feedback Message */}
                <AnimatePresence>
                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`p-4 rounded-xl text-center font-medium flex items-center justify-center gap-2 ${feedback === 'correct' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                                }`}
                        >
                            {feedback === 'correct' ? (
                                <>
                                    <Check className="w-5 h-5" />
                                    Correct! Great job balancing that equation.
                                </>
                            ) : (
                                <>
                                    <X className="w-5 h-5" />
                                    Not quite right. Check the number of atoms on both sides.
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// Helper for arrow icon
const ArrowRightIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

export default PracticeMode;
