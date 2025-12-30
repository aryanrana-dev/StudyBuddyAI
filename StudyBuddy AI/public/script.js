//Variable declaration
let result = "";

// State Management
let selectedLevel = null;
let selectedOptions = [];

// Navigation Function
function navigateTo(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    // Show target screen
    document.getElementById(screenId).classList.add('active');
}

// Selection Logic (Level - Single Select)
document.querySelectorAll('.level').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all levels
        document.querySelectorAll('.level').forEach(i => i.classList.remove('selected'));
        // Add to clicked
        this.classList.add('selected');
        selectedLevel = this.getAttribute('data-value');
    });
});

// Selection Logic (Content - Multi Select)
document.querySelectorAll('.content').forEach(item => {
    item.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        if (this.classList.contains('selected')) {
            this.classList.remove('selected');
            selectedOptions = selectedOptions.filter(opt => opt !== value);
        } else {
            this.classList.add('selected');
            selectedOptions.push(value);
        }
    });
});

// Main Generation Logic
async function startGeneration() {
    const topic = document.getElementById('topicInput').value;
    
    // Validation FIRST
    if (!topic) { alert("Please enter a topic!"); return; }
    if (!selectedLevel) { alert("Please select a difficulty level!"); return; }
    if (selectedOptions.length === 0) { alert("Please select at least one content type!"); return; }

    // Go to loading screen
    navigateTo('loading-screen');

    try {
        // Make API call
        console.log("Requesting AI for:", topic, selectedLevel);
        const response = await fetch('/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ studyTopic: topic, studyLevel: selectedLevel })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        result = await response.json();
        console.log("AI Response received:", result);
        
        // Render output and navigate
        renderOutput(topic);
        navigateTo('output-screen');
    } catch (error) {
        console.error("Error fetching AI response:", error);
        alert("Failed to generate study material. Please try again.");
        navigateTo('learn-screen');
    }
}

// Render the Output
function renderOutput(topic) {
    const container = document.getElementById('output-container');
    document.getElementById('output-title').innerText = topic;
    document.getElementById('output-level-badge').innerText = `Level: ${selectedLevel}`;
    
    container.innerHTML = ''; // Clear previous

    // Helper to create card
    const createCard = (title, content, isError = false) => {
        const div = document.createElement('div');
        div.className = `output-card ${isError ? 'error-msg' : ''}`;
        div.innerHTML = `<h3>${title}</h3><div>${content}</div>`;
        return div;
    };

    // 1. Concise Summary (data-value="summary")
    if (selectedOptions.includes('summary')) {
        container.appendChild(createCard("Concise Summary", 
            `<p>${result.summary || 'No summary available.'}</p>`
        ));
    }

    // 2. Detailed Answer
    if (selectedOptions.includes('detailed')) {
        container.appendChild(createCard("Detailed Explanation", 
            `<p>${result.explanation || 'No explanation available.'}</p>`
        ));
    }

    // 3. Important Questions
    if (selectedOptions.includes('questions')) {
        let questionsHTML = '';
        if (result.questionsAndAnswers && Object.keys(result.questionsAndAnswers).length) {
            for (const [question, answer] of Object.entries(result.questionsAndAnswers)) {
                questionsHTML += `<p><strong>Q: ${question}</strong></p>`;
                questionsHTML += `<p>A: ${answer}</p>`;
                questionsHTML += `<br>`;
            }
        }
        container.appendChild(createCard("Important Questions", questionsHTML || '<p>No questions available.</p>'));
    }

    // 4. Technical Examples (Mapped to data-value="texamples")
    if (selectedOptions.includes('texamples')) {
        let techHTML = '';
        if (result.technicalExamples && Array.isArray(result.technicalExamples) && result.technicalExamples.length > 0) {
            techHTML += '<ul>';
            result.technicalExamples.forEach(ex => {
                techHTML += `<li>${ex}</li></br>`;
            });
            techHTML += '</ul>';
        }
        container.appendChild(createCard("Technical Examples", techHTML || '<p>No technical examples available.</p>'));
    }

    // 5. Real-world Examples (Mapped to data-value="rwexamples")
    if (selectedOptions.includes('rwexamples')) {
        let realHTML = '';
        if (result.realWorldExamples && Array.isArray(result.realWorldExamples) && result.realWorldExamples.length > 0) {
            realHTML += '<ul>';
            result.realWorldExamples.forEach(ex => {
                realHTML += `<li>${ex}</li></br>`;
            });
            realHTML += '</ul>';
        }
        container.appendChild(createCard("Real-world Examples", realHTML || '<p>No real-world examples available.</p>'));
    }

    // 6. Step by Step Approach (Mapped to data-value="steps")
    if (selectedOptions.includes('steps')) {
        let stepsHTML = '';
        if (result.steps && Array.isArray(result.steps) && result.steps.length > 0) {
            stepsHTML += '<ol>';
            result.steps.forEach(step => {
                stepsHTML += `<li>${step}</li></br>`;
            });
            stepsHTML += '</ol>';
        }
        container.appendChild(createCard("Step by Step Approach", stepsHTML || '<p>No steps available.</p>'));
    }

    // 7. Mind Map
    if (selectedOptions.includes('mindmap')) {
        container.appendChild(createCard("Mind Map", 
            `<div style="text-align:center; padding:10px; border:1px dashed #666;">
                [ ${topic} ] <br>
                / &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; \\ <br>
               Concept A &nbsp; Concept B &nbsp; Concept C
             </div>`
        ));
    }

    // 8. Related Images (SPECIAL LOGIC)
    if (selectedOptions.includes('images')) {
        container.appendChild(createCard("Related Images", 
            "This feature is not available, coming soon.", 
            true // sets isError to true for styling
        ));
    }
}