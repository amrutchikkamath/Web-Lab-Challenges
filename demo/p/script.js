// 1. Convert JSON text to JavaScript Object
function convertJsonToObject() {
    const jsonText = document.getElementById('jsonText').value;
    try {
        const jsObject = JSON.parse(jsonText);
        document.getElementById('jsonObjectOutput').textContent = JSON.stringify(jsObject, null, 2);
    } catch (error) {
        document.getElementById('jsonObjectOutput').textContent = "Invalid JSON!";
    }
}

// 2. Convert JSON results into Date
function convertJsonToDate() {
    const jsonDate = document.getElementById('jsonDate').value;
    try {
        const obj = JSON.parse(jsonDate);
        const date = new Date(obj.date);
        document.getElementById('jsonDateOutput').textContent = date.toString();
    } catch (error) {
        document.getElementById('jsonDateOutput').textContent = "Invalid JSON or Date!";
    }
}

// 3. Convert JSON to CSV
function convertJsonToCsv() {
    const jsonInput = document.getElementById('jsonToCsv').value;
    try {
        const jsonArray = JSON.parse(jsonInput);
        const keys = Object.keys(jsonArray[0]);
        const csv = [
            keys.join(','),
            ...jsonArray.map(row => keys.map(key => row[key]).join(','))
        ].join('\n');
        document.getElementById('csvOutput').textContent = csv;
    } catch (error) {
        document.getElementById('csvOutput').textContent = "Invalid JSON!";
    }
}

// 4. Convert CSV to JSON
function convertCsvToJson() {
    const csvInput = document.getElementById('csvInput').value;
    try {
        const lines = csvInput.split('\n');
        const headers = lines[0].split(',');
        const result = lines.slice(1).map(line => {
            const obj = {};
            const values = line.split(',');
            headers.forEach((header, i) => {
                obj[header] = values[i];
            });
            return obj;
        });
        document.getElementById('jsonFromCsvOutput').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('jsonFromCsvOutput').textContent = "Invalid CSV!";
    }
}

// 5. Create hash from string using crypto.createHash (Browser alternative)
function createHash() {
    const inputString = document.getElementById('stringToHash').value;
    if (window.crypto && window.crypto.subtle) {
        const encoder = new TextEncoder();
        const data = encoder.encode(inputString);
        window.crypto.subtle.digest('SHA-256', data)
            .then(hashBuffer => {
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
                document.getElementById('hashOutput').textContent = hashHex;
            })
            .catch(error => {
                document.getElementById('hashOutput').textContent = 'Error generating hash.';
            });
    } else {
        document.getElementById('hashOutput').textContent = 'Web Crypto API is not supported.';
    }
}
