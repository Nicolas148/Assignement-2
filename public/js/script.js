document.addEventListener('DOMContentLoaded', () => {
    const squareButton = document.getElementById('squareButton');
    const cubeButton = document.getElementById('cubeButton');
    const resultDiv = document.getElementById('result');
    const numberInput = document.getElementById('numberInput');

    squareButton.addEventListener('click', () => {
        const number = numberInput.value
        fetchDataAndDisplayResult('square', number);
    });

    cubeButton.addEventListener('click', () => {
        const number = numberInput.value;
        fetchDataAndDisplayResult('cube', number);
    });

    function fetchDataAndDisplayResult(operation, number) {
        // Make an AJAX request to the dynamic endpoint with the chosen operation
        fetch(`/api/data?number=${number}&operation=${operation}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok (HTTP ${response.status}).`);
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    resultDiv.textContent = data.error;
                } else {
                    resultDiv.textContent = `${operation} of ${number} is ${data.result}`;
                }
            })
            .catch(error => {
                resultDiv.textContent = `An error occurred: ${error.message}`;
                console.error(error);
            });
    }
});