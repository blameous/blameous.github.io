const form = document.getElementById('form');
const input_adrs = document.getElementById('btc_adrs');

const wallet = document.querySelector('.search_txt');
const button = document.querySelector('.search_btn');
const url = 'https://blockchain.info/multiaddr?cors=true&active=';
const xhr = new XMLHttpRequest()



form.addEventListener('submit', e => {
	e.preventDefault();	
	checkInputs();
	if(input_adrs.value != 0) {
		init_data()
	}
});



function checkInputs() {
	// trim to remove the whitespaces
	const input_adrsValue = input_adrs.value.trim();
		
	if(input_adrsValue === '') {
		setErrorFor(input_adrs, 'Please enter the Bitcoin address');
	} else if(input_adrsValue.length < 25) {
		setErrorFor(input_adrs, 'Invalid Bitcoin address');
	} else if(input_adrsValue.length > 59) {
		setErrorFor(input_adrs, 'Invalid Bitcoin address');
	} else if(!/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(input_adrsValue)) {
		setErrorFor(input_adrs, 'Invalid Bitcoin address');
	} else {
		setSuccessFor(input_adrs);
	}
}
	

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}


function init_data() { // blockchain.com

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var jsontext=xhr.responseText;
			var data = JSON.parse(jsontext);
			let balance_info = data.wallet.final_balance
			
			document.getElementsByClassName("balance_block")[0].style.display = "flex";
			document.getElementsByClassName("balance_block")[0].innerHTML = "Total Balance - " + (balance_info*0.00000001) + " BTC";
			
		}
		
	}

	xhr.open("GET", url + wallet.value, true);
	xhr.send();
}







