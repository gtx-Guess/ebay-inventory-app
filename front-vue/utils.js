import axios from "axios";
const BASE_URL = 'http://127.0.0.1:8000/api';

const makeSaveRequest = async (saveFormData, alertText) => {
    try {
        const newEbayItem = { 
            item_id: saveFormData.ebayItemId, 
            container_id: saveFormData.containerId, 
            listing_status: saveFormData.listingStatus 
        };
        const resp = await axios.post(`${BASE_URL}/create-ebay-item`, newEbayItem);
        if(resp.status === 200){
            alertText.value = 'Saved!';
            setTimeout( () => $('#alert').toggleClass('hide'), 3000 );
            return 200
        };
    } catch (error) {
        alertText.value = 'There was a problem saving!';
        setTimeout( () => $('#alert').toggleClass('hide'), 3000 );
        console.log(error);
        return false
    };
};

const makeItemSearchRequest = async (itemSearchForm, alertText) => {
    try {
        const resp = await axios.get(`${BASE_URL}/get-ebay-item/${itemSearchForm.itemId}`);
        if(resp.status === 200){
            alertText.value = 'Found the ebay item!';
            setTimeout( () => $('#alert').toggleClass('hide'), 3000 );
            return 200;
        };
    } catch (error) {
        alertText.value = 'Could not find this item!';
        setTimeout(() => $('#alert').toggleClass('hide') , 3000);
        console.error(error);
        return false
    };
};

const makeContainerSearchRequest = async (containerSearchForm, alertText) => {
    try {
        const resp = await axios.get(`${BASE_URL}/get-container/${containerSearchForm.containerId}`);
        if(resp.status === 200){
            alertText.value = 'Found the container!';
            setTimeout( () => $('#alert').toggleClass('hide'), 3000 );
            return 200;
        };
    } catch (error) {
        alertText.value = `Couldnt find container by ID: ${containerSearchForm.containerId}!`;
        setTimeout(() => $('#alert').toggleClass('hide') , 3000);
        console.error(error);
        return false;
    }
};

export {
    makeSaveRequest,
    makeItemSearchRequest,
    makeContainerSearchRequest
};