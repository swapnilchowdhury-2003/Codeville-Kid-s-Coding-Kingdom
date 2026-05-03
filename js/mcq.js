// ===================================
// CODEVILLE - MCQ SYSTEM
// Multiple Choice Questions for Learning
// ===================================

const MCQSystem = {
    // MCQ questions for each story
    questions: {
        0: [ // Cody's Name Tag - Variables
            {
                question: "What is a variable in programming?",
                options: [
                    "A container that stores information",
                    "A type of robot",
                    "A game character",
                    "A color"
                ],
                correct: 0,
                explanation: "A variable is like a box that holds information. You can change what's inside anytime!"
            },
            {
                question: "Can you change the value stored in a variable?",
                options: [
                    "No, it stays the same forever",
                    "Yes, you can change it anytime",
                    "Only once",
                    "Only on Mondays"
                ],
                correct: 1,
                explanation: "Variables are flexible! You can change their values whenever you need to."
            },
            {
                question: "What happens when you assign a new value to a variable?",
                options: [
                    "The computer breaks",
                    "Nothing happens",
                    "The old value is replaced with the new one",
                    "Both values are stored"
                ],
                correct: 2,
                explanation: "When you give a variable a new value, it replaces the old one - just like changing a name tag!"
            }
        ],
        1: [ // Magic Food Table - Lists/Arrays
            {
                question: "What is a list (or array) in programming?",
                options: [
                    "A single item",
                    "A collection of items stored together",
                    "A type of food",
                    "A magic spell"
                ],
                correct: 1,
                explanation: "A list is like a table that can hold many items in order, each with its own spot!"
            },
            {
                question: "How do we identify items in a list?",
                options: [
                    "By their color",
                    "By their size",
                    "By their position number (index)",
                    "By their taste"
                ],
                correct: 2,
                explanation: "Each item in a list has a position number called an index, starting from 0!"
            },
            {
                question: "Can a list hold different types of items?",
                options: [
                    "No, only one type",
                    "Yes, it can hold different types",
                    "Only numbers",
                    "Only text"
                ],
                correct: 1,
                explanation: "Lists are flexible! They can hold numbers, text, and even other lists!"
            }
        ],
        2: [ // Dancing Robot - Loops
            {
                question: "What is a loop in programming?",
                options: [
                    "A circle shape",
                    "A way to repeat actions multiple times",
                    "A type of dance",
                    "A broken program"
                ],
                correct: 1,
                explanation: "A loop lets you repeat actions without writing the same code over and over!"
            },
            {
                question: "Why do we use loops?",
                options: [
                    "To make programs slower",
                    "To confuse the computer",
                    "To repeat tasks efficiently",
                    "To make programs colorful"
                ],
                correct: 2,
                explanation: "Loops save time and make code shorter by repeating tasks automatically!"
            },
            {
                question: "What happens in a loop?",
                options: [
                    "Code runs once and stops",
                    "Code runs a specific number of times",
                    "Nothing happens",
                    "The computer sleeps"
                ],
                correct: 1,
                explanation: "A loop runs the same code multiple times - like making Cody dance 5 times!"
            }
        ],
        3: [ // Weather Wardrobe - Conditionals
            {
                question: "What is a conditional statement (if-else)?",
                options: [
                    "A way to make decisions in code",
                    "A type of weather",
                    "A math problem",
                    "A game rule"
                ],
                correct: 0,
                explanation: "Conditionals let programs make decisions based on different situations!"
            },
            {
                question: "When do we use 'if' statements?",
                options: [
                    "To repeat code",
                    "To store data",
                    "To check conditions and make choices",
                    "To end a program"
                ],
                correct: 2,
                explanation: "'If' statements check if something is true, then decide what to do!"
            },
            {
                question: "What does 'else' do in programming?",
                options: [
                    "Repeats the code",
                    "Runs when the 'if' condition is false",
                    "Stops the program",
                    "Creates a variable"
                ],
                correct: 1,
                explanation: "'Else' provides an alternative action when the 'if' condition isn't true!"
            }
        ],
        4: [ // Magic Box - Functions
            {
                question: "What is a function in programming?",
                options: [
                    "A reusable block of code that does a specific task",
                    "A type of box",
                    "A math equation",
                    "A game level"
                ],
                correct: 0,
                explanation: "Functions are like recipes - they contain instructions you can use over and over!"
            },
            {
                question: "Why do we use functions?",
                options: [
                    "To make code messy",
                    "To organize code and reuse it",
                    "To slow down programs",
                    "To delete data"
                ],
                correct: 1,
                explanation: "Functions help organize code and let you reuse the same instructions many times!"
            },
            {
                question: "Can a function give back a result?",
                options: [
                    "No, never",
                    "Yes, it can return a value",
                    "Only on weekends",
                    "Only numbers"
                ],
                correct: 1,
                explanation: "Functions can return results, like a magic box giving you a treasure!"
            }
        ],
        5: [ // Recipe Robot - Algorithms
            {
                question: "What is an algorithm?",
                options: [
                    "A type of robot",
                    "A step-by-step set of instructions",
                    "A cooking ingredient",
                    "A computer game"
                ],
                correct: 1,
                explanation: "An algorithm is like a recipe - clear steps to solve a problem or complete a task!"
            },
            {
                question: "Why are algorithms important?",
                options: [
                    "They make computers colorful",
                    "They help solve problems in an organized way",
                    "They are not important",
                    "They make programs slower"
                ],
                correct: 1,
                explanation: "Algorithms help us solve problems efficiently by following clear steps!"
            },
            {
                question: "What makes a good algorithm?",
                options: [
                    "It's very long",
                    "It's confusing",
                    "It's clear, efficient, and solves the problem",
                    "It has many errors"
                ],
                correct: 2,
                explanation: "Good algorithms are clear, efficient, and successfully solve the problem!"
            }
        ]
    },

    // Get questions for a story
    getQuestions: function(storyId) {
        return this.questions[storyId] || [];
    },

    // Check if MCQ is completed for a story
    isMCQCompleted: function(storyId) {
        const profile = ProfileManager.getProfile();
        if (!profile) return false;
        
        const mcqData = profile.mcqCompleted || {};
        return mcqData[storyId] !== undefined;
    },

    // Get MCQ score for a story
    getMCQScore: function(storyId) {
        const profile = ProfileManager.getProfile();
        if (!profile) return null;
        
        const mcqData = profile.mcqCompleted || {};
        return mcqData[storyId] || null;
    },

    // Save MCQ completion
    saveMCQCompletion: function(storyId, score, totalQuestions) {
        const profile = ProfileManager.getProfile();
        if (!profile) return;

        if (!profile.mcqCompleted) {
            profile.mcqCompleted = {};
        }

        const percentage = Math.round((score / totalQuestions) * 100);
        
        profile.mcqCompleted[storyId] = {
            score: score,
            total: totalQuestions,
            percentage: percentage,
            completedAt: new Date().toISOString()
        };

        // Award bonus points for MCQ completion
        const bonusPoints = score * 5; // 5 points per correct answer
        profile.starsEarned = (profile.starsEarned || 0) + Math.floor(bonusPoints / 10);

        localStorage.setItem('codevilleProfile', JSON.stringify(profile));

        return {
            score: score,
            total: totalQuestions,
            percentage: percentage,
            bonusPoints: bonusPoints
        };
    }
};

// MCQ UI Controller
const MCQController = {
    currentStoryId: null,
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    answers: [],

    // Initialize MCQ for a story
    init: function(storyId) {
        this.currentStoryId = storyId;
        this.questions = MCQSystem.getQuestions(storyId);
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];

        // Check if already completed
        const completed = MCQSystem.isMCQCompleted(storyId);
        const mcqButton = document.getElementById('mcqButton');
        
        if (mcqButton && completed) {
            const scoreData = MCQSystem.getMCQScore(storyId);
            mcqButton.innerHTML = `
                <span>📝</span>
                <span>Quiz Completed (${scoreData.percentage}%)</span>
            `;
        }
    },

    // Show MCQ modal
    showMCQ: function() {
        const modal = document.getElementById('mcqModal');
        if (!modal) return;

        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];

        modal.classList.add('active');
        this.displayQuestion();

        if (window.Codeville) {
            window.Codeville.playSound('click');
        }
    },

    // Display current question
    displayQuestion: function() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        const container = document.getElementById('mcqQuestionContainer');
        
        if (!container) return;

        container.innerHTML = `
            <div class="mcq-progress">
                Question ${this.currentQuestionIndex + 1} of ${this.questions.length}
            </div>
            <div class="mcq-question">
                ${question.question}
            </div>
            <div class="mcq-options">
                ${question.options.map((option, index) => `
                    <button class="mcq-option" onclick="MCQController.selectAnswer(${index})">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;
    },

    // Select an answer
    selectAnswer: function(selectedIndex) {
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correct;

        if (isCorrect) {
            this.score++;
            if (window.Codeville) {
                window.Codeville.playSound('success');
            }
        } else {
            if (window.Codeville) {
                window.Codeville.playSound('error');
            }
        }

        this.answers.push({
            questionIndex: this.currentQuestionIndex,
            selected: selectedIndex,
            correct: question.correct,
            isCorrect: isCorrect
        });

        // Show feedback
        this.showFeedback(isCorrect, question.explanation);
    },

    // Show feedback for answer
    showFeedback: function(isCorrect, explanation) {
        const container = document.getElementById('mcqQuestionContainer');
        
        container.innerHTML = `
            <div class="mcq-feedback ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="feedback-icon">${isCorrect ? '✅' : '❌'}</div>
                <div class="feedback-title">${isCorrect ? 'Correct!' : 'Not quite!'}</div>
                <div class="feedback-explanation">${explanation}</div>
                <button class="mcq-next-btn" onclick="MCQController.nextQuestion()">
                    ${this.currentQuestionIndex < this.questions.length - 1 ? 'Next Question' : 'See Results'} →
                </button>
            </div>
        `;
    },

    // Move to next question
    nextQuestion: function() {
        this.currentQuestionIndex++;
        this.displayQuestion();
    },

    // Show final results
    showResults: function() {
        const container = document.getElementById('mcqQuestionContainer');
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        let message = '';
        let emoji = '';
        
        if (percentage === 100) {
            message = 'Perfect Score! You\'re a coding genius!';
            emoji = '🌟';
        } else if (percentage >= 80) {
            message = 'Excellent work! You really understand this!';
            emoji = '🎉';
        } else if (percentage >= 60) {
            message = 'Good job! Keep learning!';
            emoji = '👍';
        } else {
            message = 'Nice try! Review the story and try again!';
            emoji = '💪';
        }

        // Save completion
        const result = MCQSystem.saveMCQCompletion(
            this.currentStoryId,
            this.score,
            this.questions.length
        );

        container.innerHTML = `
            <div class="mcq-results">
                <div class="results-emoji">${emoji}</div>
                <div class="results-title">${message}</div>
                <div class="results-score">
                    <div class="score-big">${this.score}/${this.questions.length}</div>
                    <div class="score-percentage">${percentage}%</div>
                </div>
                <div class="results-bonus">
                    🎁 Bonus: +${Math.floor(result.bonusPoints / 10)} stars!
                </div>
                <div class="results-actions">
                    <button class="mcq-action-btn primary" onclick="MCQController.closeMCQ()">
                        Continue Learning
                    </button>
                    <button class="mcq-action-btn secondary" onclick="MCQController.retakeMCQ()">
                        Retake Quiz
                    </button>
                </div>
            </div>
        `;

        // Update profile display
        if (window.updateProfileDisplay) {
            window.updateProfileDisplay();
        }

        // Create confetti for good scores
        if (percentage >= 80 && window.Codeville) {
            window.Codeville.createConfetti();
        }
    },

    // Close MCQ modal
    closeMCQ: function() {
        const modal = document.getElementById('mcqModal');
        if (modal) {
            modal.classList.remove('active');
        }

        // Update button text
        const mcqButton = document.getElementById('mcqButton');
        if (mcqButton) {
            const scoreData = MCQSystem.getMCQScore(this.currentStoryId);
            if (scoreData) {
                mcqButton.innerHTML = `
                    <span>📝</span>
                    <span>Quiz Completed (${scoreData.percentage}%)</span>
                `;
            }
        }
    },

    // Retake MCQ
    retakeMCQ: function() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];
        this.displayQuestion();
    }
};

// Make available globally
window.MCQSystem = MCQSystem;
window.MCQController = MCQController;

console.log('📝 MCQ System loaded!');

// Made with Bob
