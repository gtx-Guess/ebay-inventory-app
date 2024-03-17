<template>
    <header><h1>Ebay Inventory Tool</h1></header>
    <main>
        <aside id="alert" class="hide">{{ alertText }}</aside>
        <nav id="buttonNav" class="buttons">
            <button @click="navButtonClicked('addEbayItemForm')">Make new ebay Item</button>
            <button @click="navButtonClicked('itemSearchForm')">Search for ebay Item</button>
            <button @click="navButtonClicked('searchForItemContainerForm')">Search for Container</button>
        </nav>
        <form id="addEbayItemForm" class="hide" style="transform: translate(-50%, -5%);" @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="ebay-item-id">Enter the ebay item ID:</label>
                <input id="ebay-item-id" type="text" v-model="saveFormData.ebayItemId">
            </div>
            <div class="form-group">
                <label for="container-id">Enter the contaier ID:</label>
                <input id="container-id" type="text" v-model="saveFormData.containerId">
            </div>
            <div class="form-group">
                <label for="listing-status" style="text-align: center;">Is your ebay listing active?</label>
                <select name="listing-status" id="listing-status" v-model="saveFormData.listingStatus">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            <button @click="saveFormDataClick" class="form-submit-button">Save Item</button>
            <button id="closeModal" class="close-modal" style="margin-top: 69px;" @click="closeModalButtonClicked">Back</button>
        </form>
        <form id="itemSearchForm" class="hide" style="transform: translate(-50%, -5%);" @submit.prevent="handleSubmit">
            <div v-if="!foundItem" class="form-group" style="margin-top: 25%; font-size: 30px; flex-direction: column;">
                <label for="item-id-search" style="width: 100%;">Enter the ebay item ID:</label><br>
                <input type="text" id="item-id-search" style="padding: 10px;" v-model="itemSearchForm.itemId">
            </div>
            <div v-else class="form-group" style="margin-top: 25%; font-size: 30px; flex-direction: column;">
                <h4>this be the item searched for: {{ itemSearchForm.itemId }}</h4>
            </div>
            <button id="item-save-button" @click="itemSearchClick" class="form-submit-button">Search For Item</button>
            <button id="closeModal" class="close-modal" style="margin-top: 130px;" @click="closeModalButtonClicked">Back</button>
        </form>
        <form id="searchForItemContainerForm" class="hide" style="transform: translate(-50%, -5%);" @submit.prevent="handleSubmit">
            <div class="form-group" style="margin-top: 25%; font-size: 30px; flex-direction: column;">
                <label for="container-id-search" style="width: 100%;">Enter the container ID:</label><br>
                <input type="text" id="container-id-search" style="padding: 10px;" v-model="containerSearchForm.containerId">
            </div>
            <button @click="containerSearchClick" class="form-submit-button">Search For Container</button>
            <button id="closeModal" class="close-modal" style="margin-top: 130px;" @click="closeModalButtonClicked">Back</button>
        </form>
    </main>
</template>

<script setup>
    import { ref, reactive } from "vue";
    import { makeSaveRequest, makeItemSearchRequest, makeContainerSearchRequest } from "../utils";

    const activeModal = ref('');
    const alertText = ref('');
    const foundItem = ref(false);
    const fountContainer = ref(false);
    const defaultItemSearchForm = { itemId: '' };
    const defaultContainerSearchForm = { containerId: '' };
    const defaultSaveForm = {
        ebayItemId: '',
        containerId: '',
        listingStatus: ''
    };

    const saveFormData = reactive(defaultSaveForm);
    const itemSearchForm = reactive(defaultItemSearchForm);
    const containerSearchForm = reactive(defaultContainerSearchForm);

    const navButtonClicked = (buttonId) => {
        activeModal.value = buttonId;
        $('#buttonNav').toggleClass('hide');
        $(`#${activeModal.value}`).toggleClass('hide');
    };

    const closeModalButtonClicked = () => { 
        $(`#${activeModal.value}`).toggleClass('hide');
        $('#buttonNav').toggleClass('hide');
        resetSearchModals();
    };

    const saveFormDataClick = async () => {
        let elementIds = [ 'ebay-item-id', 'container-id', 'listing-status' ];
        if(saveFormData.ebayItemId !== "" && saveFormData.containerId !== "" && saveFormData.listingStatus !== ""){
            alertText.value = 'Saving Item!';
            $('#alert').toggleClass('hide');
            setTimeout(async () => {
                const resp = await makeSaveRequest(saveFormData, alertText);
                if(resp === 200){
                    elementIds.forEach(id => $(`#${id}`).val('') );
                };
            }, 2000);
        }else{
            alertText.value = 'All of the fields are required!';
            $('#alert').toggleClass('hide')
            setTimeout( () => $('#alert').toggleClass('hide'), 3000 );
            return false
        };
    };

    const itemSearchClick = async () => {
        if(itemSearchForm.itemId !== ""){
            alertText.value = 'Searching for ebay item!';
            $('#alert').toggleClass('hide');
            setTimeout(async ()=> {
                const resp = await makeItemSearchRequest(itemSearchForm, alertText);
                if(resp === 200){ 
                    // this jquery aint working, look into it
                    $('#item-id-search').val('');
                    foundItem.value = true;
                    // $('#item-save-button').toggleClass('hide');
                };
            }, 2000);
        }else{
            alertText.value = 'Dont forget to enter the ebay Item ID!';
            $('#alert').toggleClass('hide')
            setTimeout(() => $('#alert').toggleClass('hide') , 3000);
            return false
        };
    };

    const containerSearchClick = async () => {
        if(containerSearchForm.containerId !== ''){
            alertText.value = 'Searching for container!';
            $('#alert').toggleClass('hide');
            setTimeout(async ()=> {
                const resp = await makeContainerSearchRequest(containerSearchForm, alertText);
                if(resp === 200){ $('#container-id-search').val('') };
            }, 2000);
        }else{
            alertText.value = 'Dont forget to enter the container ID!';
            $('#alert').toggleClass('hide')
            setTimeout(() => $('#alert').toggleClass('hide') , 3000);
            return false;
        };
    };

    const resetSearchModals = () => {
        if(foundItem){
            foundItem.value = false;
            // $('#item-save-button').toggleClass('hide');
        };
        if(fountContainer){
            fountContainer.value = false;
            $('#item-save-button').toggleClass('hide');
        };
    };

</script>

<style lang="scss">

    body{
        margin: 0;
        padding: 0;
        background: rgb(215, 243, 155);
        overflow-x: hidden;
    }

    header{
        display: flex;
        justify-content: center;
        font-weight: bold;
        width: 100vw;
        z-index: 2;

        h1{
            margin-top: 10px;
            padding: 15px;
            font-size: 50px;
            width: 97vw;
            text-align: center;
            background: rgb(219, 255, 141);
            box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.6);
        }
    }

    main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        z-index: 1;
        
        aside{
            position: absolute;
            transform: translate(120%, -70%);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            font-size: 25px;
            width: 400px;
            height: 100px;
            background: #ffabe4;
            box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
            border-radius: 25px;
            animation: borderAnimation 1s linear infinite;
        }

        @keyframes borderAnimation {
            0% {
                border: 3px solid transparent;
            }
            50% {
                border: 3px solid blue;
            }
            100% {
                border: 3px solid transparent;
            }
        }

        .buttons{
            margin-top: 10vh;
            display: flex;
            align-items: center;
            flex-direction: column;
            width: 30vw;
            height: 20vh;
            
            & > button:nth-child(1),
            & > button:nth-child(2){
                margin-bottom: 45px;
            }
        }
        button{
            all: unset;
            font-size: 35px;
            padding: 20px 40px;
            background: #8ddbff;
            font-weight: bold;
            box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
            border: 1px solid black;
            text-align: center;
            &:hover{
                background: lightblue;
                box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.6);
                transform: scale(1.1);
            }
            &:active {
                transform: scale(0.9);
            }
        }

        form{
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -25vh;
            padding: 0 25px 50px 25px;
            box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
            font-size: 25px;
            height: 400px;
            background: #8ddbff;

            .form-group{
                display: flex;
                justify-content: space-between;
                flex-direction: row;
                padding: 25px;
                
                & > label{
                    padding: 5px;
                    width: 60%;
                    margin-right: 20px;
                    text-shadow: 2px 5px 8px rgba(0, 0, 0, 0.3);
                }

                input{
                    font-size: 18px;
                    border-radius: 50px;
                    box-shadow: 0 0 5px 5px rgba(255, 62, 207, 0.3);
                    border: none;
                    text-align: center;
                }

                select{
                    width: 54%;
                    margin-top: 1%;
                    margin-left: 5%;
                    text-align: center;
                    font-size: 15px;
                    box-shadow: 0 0 5px 5px rgba(255, 62, 207, 0.3);
                    border: none;
                    border-radius: 50px;
                    height: 50px;
                }
            }

            .form-submit-button{
                font-size: 25px;
                margin-top: 15%;
                padding: 10px;
                width: fit-content;
                align-self: center;
                background: #ffabe4;
                
                &:hover{
                    background: #ffbeeb;
                    box-shadow: 0 0 5px 5px rgba(219, 255, 141, 0.6);
                }
            }
        }

    }

    .close-modal{
        font-size: 25px;
        width: 100px;
        align-self: center;
    }

    .hide{
        visibility: hidden;
    };

</style>