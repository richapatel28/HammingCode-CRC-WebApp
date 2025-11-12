// Mode switching
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        
        btn.classList.add('active');
        const mode = btn.dataset.mode;
        document.getElementById(`${mode}-section`).classList.add('active');
    });
});

// ==================== CRC GENERATOR ====================

async function generateCRC() {
    const data = document.getElementById('crc-data').value.replace(/\s/g, '');
    const divisor = document.getElementById('crc-divisor').value.replace(/\s/g, '');

    if (!data || !divisor) {
        alert('Please enter both data and divisor');
        return;
    }

    if (!/^[01]+$/.test(data) || !/^[01]+$/.test(divisor)) {
        alert('Please enter valid binary strings (only 0s and 1s)');
        return;
    }

    const animationContainer = document.getElementById('crc-animation');
    const outputContainer = document.getElementById('crc-output');
    
    animationContainer.innerHTML = '<h3>CRC Generation Process</h3>';
    outputContainer.innerHTML = '';

    // Calculate number of padding zeros
    const padding = divisor.length - 1;
    const paddedData = data + '0'.repeat(padding);

    // Display initial setup
    animationContainer.innerHTML += `
        <div class="crc-step">
            <div class="step-title">Step 1: Append zeros to data</div>
            <div>Original Data: <strong>${data}</strong></div>
            <div>Divisor: <strong>${divisor}</strong></div>
            <div>Number of zeros to append: ${padding} (divisor length - 1)</div>
            <div>Padded Data: <strong>${paddedData}</strong></div>
        </div>
    `;

    await sleep(1000);

    // Perform division with animation
    let dividend = paddedData;
    let result = '';
    let stepCount = 0;

    animationContainer.innerHTML += `
        <div class="crc-step">
            <div class="step-title">Step 2: Polynomial Division</div>
            <div class="division-box" id="division-visualization"></div>
        </div>
    `;

    const divVisualization = document.getElementById('division-visualization');

    // Perform binary division
    while (dividend.length >= divisor.length) {
        stepCount++;
        
        // Find the first '1' in dividend
        if (dividend[0] === '0') {
            dividend = dividend.substring(1);
            continue;
        }

        // Perform XOR operation
        let xorResult = '';
        let stepDiv = '';
        
        for (let i = 0; i < divisor.length; i++) {
            const divBit = divisor[i];
            const divBitValue = parseInt(dividend[i] || '0');
            const genBitValue = parseInt(divBit);
            const xorValue = divBitValue ^ genBitValue;
            xorResult += xorValue;
            stepDiv += divBit;
        }

        // Create visualization for this step
        const stepDivHTML = `
            <div class="divisor-row" id="step-${stepCount}">
                <span style="margin-right: 20px;">Step ${stepCount}:</span>
                ${dividend.substring(0, divisor.length).split('').map((bit, idx) => 
                    `<span class="bit active" style="animation-delay: ${idx * 0.1}s">${bit}</span>`
                ).join('')}
                <span style="margin: 0 20px;">⊕</span>
                ${stepDiv.split('').map((bit, idx) => 
                    `<span class="bit" style="animation-delay: ${(divisor.length + idx) * 0.1}s">${bit}</span>`
                ).join('')}
                <span style="margin: 0 20px;">=</span>
                ${xorResult.split('').map((bit, idx) => 
                    `<span class="bit xor" style="animation-delay: ${(divisor.length * 2 + idx) * 0.1}s">${bit}</span>`
                ).join('')}
            </div>
        `;

        divVisualization.innerHTML += stepDivHTML;

        // Highlight the current step
        const stepElement = document.getElementById(`step-${stepCount}`);
        stepElement.classList.add('active');
        
        await sleep(1500);

        // Remove leading zeros from XOR result
        xorResult = xorResult.replace(/^0+/, '') || '0';
        
        // Get remaining bits from dividend
        const remaining = dividend.substring(divisor.length);
        
        // New dividend
        dividend = xorResult + remaining;
        
        if (dividend.length < divisor.length) {
            break;
        }

        await sleep(500);
    }

    // Calculate remainder
    const remainder = dividend.padStart(padding, '0');
    const crcCode = data + remainder;

    await sleep(1000);

    // Display final result
    divVisualization.innerHTML += `
        <div class="divisor-line"></div>
        <div class="remainder-box">
            <strong>Remainder (CRC):</strong> ${remainder}
        </div>
    `;

    await sleep(1000);

    outputContainer.innerHTML = `
        <div class="result-box">
            <h2>CRC Generation Complete!</h2>
            <div class="code-display">Original Data: ${data}</div>
            <div class="code-display">CRC Remainder: ${remainder}</div>
            <div class="code-display">Final Code: ${crcCode}</div>
            <div style="margin-top: 15px;">
                <div>Data Length: ${data.length} bits</div>
                <div>CRC Length: ${remainder.length} bits</div>
                <div>Total Length: ${crcCode.length} bits</div>
            </div>
        </div>
    `;
}

// ==================== HAMMING CODE ====================

function generateHamming() {
    const data = document.getElementById('hamming-data').value.replace(/\s/g, '');

    if (!data) {
        alert('Please enter binary data');
        return;
    }

    if (!/^[01]+$/.test(data)) {
        alert('Please enter valid binary string (only 0s and 1s)');
        return;
    }

    if (data.length !== 4 && data.length !== 8) {
        alert('Please enter 4 or 8 bits of data');
        return;
    }

    const animationContainer = document.getElementById('hamming-animation');
    const outputContainer = document.getElementById('hamming-output');
    
    animationContainer.innerHTML = '<h3>Hamming Code Generation Process</h3>';
    outputContainer.innerHTML = '';

    // Calculate number of parity bits
    const dataBits = data.length;
    let m = dataBits;
    let r = 1;
    while (Math.pow(2, r) < m + r + 1) {
        r++;
    }
    const totalBits = m + r;

    // Create positions array
    const positions = Array(totalBits).fill(null);
    let dataIndex = 0;

    // Place data bits in non-power-of-2 positions
    for (let i = 1; i <= totalBits; i++) {
        if (!isPowerOfTwo(i)) {
            positions[i - 1] = {
                value: data[dataIndex++],
                type: 'data',
                position: i
            };
        }
    }

    // Calculate parity bits
    const parityBits = [];
    for (let p = 0; p < r; p++) {
        const parityPos = Math.pow(2, p);
        const checkPositions = getCheckPositions(parityPos, totalBits);
        
        // Count ones in positions to check
        let ones = 0;
        checkPositions.forEach(pos => {
            if (positions[pos - 1] && positions[pos - 1].value === '1') {
                ones++;
            }
        });

        // Set parity bit (even parity)
        const parityValue = (ones % 2 === 0) ? '0' : '1';
        positions[parityPos - 1] = {
            value: parityValue,
            type: 'parity',
            position: parityPos,
            checkedPositions: checkPositions
        };
        parityBits.push({ position: parityPos, value: parityValue });
    }

    // Display animation
    displayHammingAnimation(animationContainer, positions, parityBits, data);

    // Generate final code
    const hammingCode = positions.map(p => p.value).join('');

    setTimeout(() => {
        outputContainer.innerHTML = `
            <div class="result-box">
                <h2>Hamming Code Generation Complete!</h2>
                <div class="code-display">Original Data: ${data}</div>
                <div class="code-display">Hamming Code: ${hammingCode}</div>
                <div style="margin-top: 15px;">
                    <div>Data Bits: ${dataBits}</div>
                    <div>Parity Bits: ${r}</div>
                    <div>Total Bits: ${totalBits}</div>
                    <div style="margin-top: 10px;">
                        <strong>Parity Bits:</strong><br>
                        ${parityBits.map(p => `P${p.position} = ${p.value}`).join('<br>')}
                    </div>
                </div>
            </div>
        `;
    }, 2000 + parityBits.length * 1000);
}

function displayHammingAnimation(container, positions, parityBits, originalData) {
    const grid = document.createElement('div');
    grid.className = 'hamming-grid';
    grid.id = 'hamming-grid';

    // Create initial grid
    positions.forEach((pos, index) => {
        const bitDiv = document.createElement('div');
        bitDiv.className = `hamming-bit ${pos.type}`;
        bitDiv.id = `bit-${index + 1}`;
        bitDiv.innerHTML = `
            <div>${pos.value || '?'}</div>
            <div class="bit-label">${isPowerOfTwo(index + 1) ? `P${index + 1}` : `D${index + 1}`}</div>
        `;
        grid.appendChild(bitDiv);
    });

    container.appendChild(grid);

    // Animate step by step
    setTimeout(async () => {
        // Show data bits
        positions.forEach((pos, index) => {
            if (pos.type === 'data') {
                setTimeout(() => {
                    const bitEl = document.getElementById(`bit-${index + 1}`);
                    bitEl.classList.add('active');
                }, index * 200);
            }
        });

        // Calculate and show parity bits
        for (let i = 0; i < parityBits.length; i++) {
            const parity = parityBits[i];
            await sleep(1500);
            
            const bitEl = document.getElementById(`bit-${parity.position}`);
            bitEl.classList.remove('active');
            bitEl.classList.add('calculated');

            // Highlight checked positions
            parity.checkedPositions.forEach(pos => {
                if (pos !== parity.position) {
                    const checkEl = document.getElementById(`bit-${pos}`);
                    checkEl.style.boxShadow = '0 0 10px #ff6b6b';
                }
            });

            await sleep(1000);

            // Remove highlights
            parity.checkedPositions.forEach(pos => {
                const checkEl = document.getElementById(`bit-${pos}`);
                checkEl.style.boxShadow = '';
            });

            bitEl.classList.remove('calculated');
            bitEl.classList.add('active');
        }
    }, 500);
}

function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}

function getCheckPositions(parityPos, totalBits) {
    const positions = [];
    for (let i = parityPos; i <= totalBits; i++) {
        if ((i & parityPos) !== 0) {
            positions.push(i);
        }
    }
    return positions;
}

// Utility function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

