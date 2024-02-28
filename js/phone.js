// console.log('phone is connected');

const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText} `);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    // step-1 
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // console.log('is Show all', isShowAll);

    // display only first 12 phone if not show all

    if(!isShowAll){
        phones = phones.slice(0, 12);
    }


    phones.forEach(phone => {
        // console.log(phone);
        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        // step-3: set innerHTML 
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name} </h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        `;
        // step-4: Append Child
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner....
    toggleLoadingSpinner(false);
}

// 
const handleShowDetails = async (id) => {
    console.log('clicked',id);
    // load single phone data
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;

    showPhoneDetails(phone);


}

const showPhoneDetails = (phone) => {
    console.log(phone);

    // const phoneName = document.getElementById('show-detail-phone-name');
    // phoneName.innerText = phone.name;

    showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <div class="flex items-center justify-center bg-[#0D6EFD0D] py-20 rounded-lg"> 
    <img src="${phone.image}" alt="">
    </div>
    <h3 class="font-bold text-lg mt-4">${phone.name} </h3>
    <p class="my-4 text-[#706F6F]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p class="text-[#706F6F] " ><span class=" text-[#403F3F] text-lg font-semibold ">Storage: </span>${phone?.mainFeatures?.storage} </p>
    <p class="text-[#706F6F]"><span class=" text-[#403F3F] text-lg font-semibold">Display Size: </span>${phone?.mainFeatures?.displaySize} </p>
    <p class="text-[#706F6F]"><span class=" text-[#403F3F] text-lg font-semibold">ChipSet: </span>${phone?.mainFeatures?.chipSet} </p>
    <p class="text-[#706F6F]"><span class=" text-[#403F3F] text-lg font-semibold">Memory: </span>${phone?.mainFeatures?.memory} </p>
    <p class="text-[#706F6F]"><span class=" text-[#403F3F] text-lg font-semibold">Slug: </span>${phone?.slug} </p>        
    <p class="text-[#706F6F]"><span class=" text-[#403F3F] text-lg font-semibold">Release date:</span>${phone?.releaseDate} </p>
    <p class="text-[#706F6F]"><span class=" text-[#403F3F] text-lg font-semibold">Brand: </span>${phone?.brand} </p>
    
    <p class="text-[#706F6F]"><span class=" text-[#403F3F] text-lg font-semibold">GPS: </span>${phone?.others?.GPS ? phone.others.GPS:  'No GPS available in this device'} </p>
    `;
    // <p><span>GPS:</span>${phone?.others?.GPS || 'No GPS'} </p>

    // show the modal
    show_details_modal.showModal();
}

 
// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}
// another practice

// const handleSearch2 = () => {
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    // console.log('show all clicked');
    handleSearch(true);

}

// loadPhone();

