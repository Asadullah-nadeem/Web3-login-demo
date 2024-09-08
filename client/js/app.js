const loginButton = document.getElementById('loginButton');
const statusText = document.getElementById('status');
const userAddressContainer = document.getElementById('userAddress');
const userAddressText = document.getElementById('userAddressText');
let web3;

async function loginWithMetaMask() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            const userAddress = accounts[0];
            
            console.log('User address:', userAddress);

            userAddressText.textContent = userAddress;
            userAddressContainer.classList.remove('hidden'); // Show the address card
            loginButton.style.display = 'none';

           

            const response = await fetch('http://localhost:3000/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address: userAddress }),
            });

            if (response.ok) {
                console.log('✅ Login success');
            } else {
                console.error('❌ Login failed');
                statusText.textContent = '❌ Login failed!';
                statusText.className = 'text-red-600';
            }
        } catch (error) {
            console.error('❌ Error connecting to MetaMask:', error);
            statusText.textContent = '❌ Error connecting to MetaMask. Please try again.';
            statusText.className = 'text-red-600';
        }
    } else {
        console.error('❌ MetaMask is not installed!');
        statusText.textContent = '❌ MetaMask is not installed. Please install MetaMask.';
        statusText.className = 'text-red-600';
    }
}

loginButton.addEventListener('click', loginWithMetaMask);
