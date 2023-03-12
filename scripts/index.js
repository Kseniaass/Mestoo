import initialCards from './data.js';

const cardsContainer = document.querySelector('.elements');

const elementTemplate = document.querySelector('.element__template').content.querySelector('.element');

/*профиль*/
const popupProfile = document.querySelector('.popup_type_profile');
const popupOpenButtonElement = document.querySelector('.profile__edit');
const popupCloseButtonElement = popupProfile.querySelector('.popup__close-button');
const popupProfileForm = popupProfile.querySelector('.popup__edit-form');
const popupInputName = popupProfileForm.querySelector('.popup__input_type_name');
const popupInputJob = popupProfileForm.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupSubmitButton = popupProfile.querySelector('.popup__submit-button');
/*карточка*/
const popupAddCard = document.querySelector('.popup_type_create-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__add-form');
const popupOpenAddCardElement = document.querySelector('.profile__add-button');
const popupInputPlaceName = popupAddCardForm.querySelector('.popup__input_type_place');
const popupInputPlaceLink = popupAddCardForm.querySelector('.popup__input_type_link');
const popupCreateButton = popupAddCard.querySelector('.popup__create-button');
const popupCloseCardElement = popupAddCard.querySelector('.popup__close-button');

/*картинка*/
const popupPicture = document.querySelector('.popup_type_big-picture');
const popupImage = popupPicture.querySelector('.popup__image');
const popupDescription = popupPicture.querySelector('.popup__description');
const popupPictureCloseButton = popupPicture.querySelector('.popup__close-button');

const handleDeleteCard = (event) => {
    event.target.closest('.element').remove();
}

const handleLikeCard = (event) => {
    event.target.closest('.element__like').classList.toggle('element__like_active');
}

const createCard = (card) => {
    const cardElement = elementTemplate.cloneNode(true);

    const cardPicture = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__title');
    cardPicture.src = card.link;
    cardPicture.alt = card.name;
    cardTitle.textContent = card.name;

    const deleteButtonElement = cardElement.querySelector('.element__delete-button');
    deleteButtonElement.addEventListener('click', handleDeleteCard);

    const likeButtonElement = cardElement.querySelector('.element__like');
    likeButtonElement.addEventListener('click', handleLikeCard);

    cardPicture.addEventListener('click', () => {
        popupImage.src = card.link;
        popupImage.alt = card.name;
        popupDescription.textContent = card.name;
        openPopup(popupPicture);
    })

    return cardElement;
}

const renderInitalCards = (item) => {
    cardsContainer.prepend(createCard(item));
}

initialCards.forEach((item) => {
    renderInitalCards(item);
})

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    })
})

popupOpenButtonElement.addEventListener('click', function () {
    openPopup(popupProfile);
    profileName.value= popupInputName.textContent ;
    profileJob.value = popupInputJob.textContent;
});

popupOpenAddCardElement.addEventListener('click', function () {
     openPopup(popupAddCard);
 }); 

const closePopupOverlayClick = (event) => {
 if (!event.target.closest('.popup__container')) {
        closePopup(event.target)
    }
 }

popupCloseButtonElement.addEventListener('click', function () {
     closePopup(popupProfile)
 });
 popupCloseCardElement.addEventListener('click', function () {
     closePopup(popupAddCard)
});

 popupBigImageCloseButton.addEventListener('click', function () {
    closePopup(popupBig);
 })

function submitProfileInfo(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    closePopup(popupProfile);
}

function submitFormCard(event) {
    event.preventDefault();
    renderInitalCards({
        name: popupInputPlaceName.value,
        link: popupInputPlaceLink.value,
    });
    event.target.reset();
    closePopup(popupAddCard)
}

popupOpenButtonElement.addEventListener('click', function () {
    openPopup(popupProfile);
    popupInputName.value = profileName.textContent;
    popupInputJob.value = profileJob.textContent;
});

popupCloseButtonElement.addEventListener('click', function () {
    closePopup(popupProfile)
 });

popupProfileForm.addEventListener('submit', submitProfileInfo);
popupAddCardForm.addEventListener('submit', submitFormCard);

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEcs);
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEcs);
}
function closePopupByEcs(event) {
    if (event.key ==='Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}
popupOpenAddCardElement.addEventListener('click', function () {
    popupCreateButton.setAttribute('disabled', true);
    popupCreateButton.classList.add('popup__button_disabled');
    popupAddCardForm.reset();
    openPopup(popupAddCard)
})