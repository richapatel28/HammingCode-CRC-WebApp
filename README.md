# HammingCode-CRC-WebApp
A web-based Hamming Code and CRC Simulator built using HTML, CSS, and JavaScript. Demonstrates error detection and correction techniques in Computer Networks.

# 💻 Hamming Code & CRC Simulator

A **web-based Computer Networks project** built using **HTML, CSS, and JavaScript**.  
It demonstrates two key **error detection and correction techniques** — **Hamming Code** and **Cyclic Redundancy Check (CRC)** — through interactive simulations and visual explanations.

---

## 🧠 Project Overview

In digital communication, data transmitted over a network can get corrupted due to noise or interference.  
This project allows users to **understand and simulate** how **error detection** (CRC) and **error correction** (Hamming Code) work in real-time.

---

## ⚙️ Features

### 🧩 Hamming Code Simulator
- Accepts binary input from the user.  
- Automatically generates parity bits.  
- Simulates single-bit error detection and correction.  
- Highlights the position of the error visually.  
- Explains the logic of Hamming (7,4) or (12,8) codes step by step.

### 🔁 CRC (Cyclic Redundancy Check) Calculator
- Accepts message bits and generator polynomial as input.  
- Computes the CRC remainder using binary division.  
- Appends the CRC to form the transmitted codeword.  
- Allows users to test received data for error detection.  
- Displays the entire division process visually.

---

## 🧰 Technologies Used

| Component | Technology |
|------------|-------------|
| Frontend | HTML5, CSS3, JavaScript |
| Styling | Custom CSS & Animations |
| Logic | Pure JavaScript (no external libraries) |
| Concept | Computer Networks – Error Detection & Correction |

---

## 🧩 How It Works

### 🧠 Hamming Code:
1. Input binary data bits.  
2. Parity bits are added at positions that are powers of 2 (1, 2, 4, 8, …).  
3. Each parity bit checks a specific combination of data bits.  
4. If an error occurs during transmission, the parity checks identify the incorrect bit.  
5. The program corrects the bit automatically and shows the result.

### ⚡ CRC:
1. Enter the message bits and generator polynomial.  
2. The program performs **binary modulo-2 division**.  
3. Remainder (CRC bits) is appended to the message.  
4. Receiver recalculates CRC to check for errors.  
5. If remainder ≠ 0 → Error detected!

---

## 🎨 User Interface

- Simple and responsive web design.  
- Real-time visualizations of the encoding, transmission, and error correction process.  
- Color-coded highlighting for error detection.  
- Step-by-step explanation for better learning.

---

## 🚀 How to Run

1. Clone or download this repository:
   ```bash
   git clone https://github.com/yourusername/HammingCode_CRC_Simulator.git

2. Open the project folder.

3. Double-click on index.html to run it in your browser.

4. No server setup required — runs fully offline.


