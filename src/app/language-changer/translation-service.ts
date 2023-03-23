import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private translations = {
        en: {
            loginUsernameLabel: 'Username',
            loginPasswordLabel: 'Password',
            loginButton: 'Login',
            registerButton: 'Register',
            emailLabel: 'Email Address',
            resetPasswordLabel: 'Reset Password',
            firstNameLabel: 'First Name',
            lastNameLabel: 'Last Name',
            usernameRequiredError: 'Username is required',
            passwordRequiredError: 'Password is required',
            emailRequiredError: 'Email is required',
            firstNameRequiredError: 'First name is required',
            lastNameRequiredError: 'Last name is required',
            invalidEmailError: 'Invalid email format',
            incorrectUsernamePassword: 'Username or password incorrect',
            greetingsLabel: 'Hello',
            deliveriesLabel: 'Deliveries',
            deviationsLabel: 'Deviations',
            tolerancesLabel: 'Tolerances',
            contractsLabel: 'Contracts',
            logoutButton: 'Logout',
            deliveryStatusLabel: 'Delivery status',
            addDelivery: 'Add Delivery',
            dispatchDeliveryTitle: 'Dispatch Delivery',
            dispatchDeliveryQuestion: 'Are you sure you want to dispatch delivery?',
            yes: 'Yes',
            no: 'No',
            deliverDeliveryTitle: 'Deliver Delivery',
            realQuantityLabel: 'Real Quantity Delivered',
            realQuantityPlaceholder: 'Real Quantity',
            cancel: 'Cancel',
            submit: 'Submit',
            deviationDetectedTitle: 'Deviation Detected',
            continue: 'Continue',
            materialCode: 'Material Code',
            expectedQuantity: 'Expected Quantity',
            expectedDeliveryDate: 'Expected Delivery Date',
            next: 'Next',
            stepOne: 'Step one',
            stepTwo: 'Step two',
            stepThree: 'Step three',
            id: 'ID',
            segment: 'Segment',
            country: 'Country',
            city: 'City',
            selectedPlant: 'Selected plant',
            supplierId: 'Supplier ID',
            pricePerUnit: 'Price per Unit',
            selectedSupplier: 'Selected supplier',
            undispatched: 'Undispatched',
            dispatched: 'Dispatched',
            delivered: 'Delivered',
            all: 'All',
            filter: 'Filter',
            status: 'Status',
            dispatchDate: 'Dispatch Date',
            deliveryDate: 'Delivery Date',
            plantId: 'Plant ID',
            action: 'Action',
            dispatch: 'Dispatch',
            deliver: 'Deliver',
            type: 'Type',
            quantityDifference: 'Quantity Difference',
            timeDifference: 'Time Difference',
            deviationTypes: 'Deviation Types',
            qtyUpperLimit: 'Qty Upper Limit',
            qtyLowerLimit: 'Qty Lower Limit',
            dayUpperLimit: 'Day Upper Limit',
            dayLowerLimit: 'Day Lower Limit',
            addTolerance: 'Add Tolerance',
            deleteTolerance: 'Delete Tolerance',
            deleteToleranceDialog: 'Are you sure you want to delete tolerance?',
            searchTolerance: 'Search Tolerance',
            resetSearch: 'Reset Search',
            supplierName: 'Supplier Name',
            update: 'Update',
            delete: 'Delete',
            addContract: 'Add Contract',
            deleteContract: 'Delete Contract',
            deleteContractDialog: 'Are you sure you want to delete contract?',
            searchContract: 'Search Contract',
            itemsPerPage: 'Items per Page:',
        },
        ro: {
            loginUsernameLabel: 'Nume utilizator',
            loginPasswordLabel: 'Parola',
            loginButton: 'Autentificare',
            registerButton: 'Înregistrare',
            emailLabel: 'Adresa de email',
            resetPasswordLabel: 'Resetare Parolă',
            firstNameLabel: 'Prenume',
            lastNameLabel: 'Nume',
            usernameRequiredError: 'Numele de utilizator este obligatoriu',
            passwordRequiredError: 'Parola este obligatorie',
            emailRequiredError: 'Email-ul este obligatoriu',
            firstNameRequiredError: 'Prenumele este obligatoriu',
            lastNameRequiredError: 'Numele este obligatoriu',
            invalidEmailError: 'Format adresa email invalid',
            incorrectUsernamePassword: 'Nume de utilizator sau parolă incorecte',
            greetingsLabel: 'Salut',
            deliveriesLabel: 'Livrări',
            deviationsLabel: 'Deviații',
            tolerancesLabel: 'Toleranțe',
            contractsLabel: 'Contracte',
            logoutButton: 'Delogare',
            deliveryStatusLabel: 'Status Livrare',
            addDelivery: 'Adaugă Livrare',
            dispatchDeliveryTitle: 'Expediere Livrare',
            dispatchDeliveryQuestion: 'Sigur doriți să expediați livrarea?',
            yes: 'Da',
            no: 'Nu',
            deliverDeliveryTitle: 'Trimitere Livrare',
            realQuantityLabel: 'Cantitate Numărată Livrată',
            realQuantityPlaceholder: 'Cantitate Numărată',
            cancel: 'Anulează',
            submit: 'Trimite',
            deviationDetectedTitle: 'Deviație Detectată',
            continue: 'Continuă',
            materialCode: 'Cod Material',
            expectedQuantity: 'Cantitate Așteptată',
            expectedDeliveryDate: 'Data de Livrare Așteptată',
            next: 'Următorul',
            stepOne: 'Pasul Unu',
            stepTwo: 'Pasul Doi',
            stepThree: 'Pasul Trei',
            id: 'ID',
            segment: 'Segment',
            country: 'Țară',
            city: 'Oraș',
            selectedPlant: 'Fabrica Selectată',
            supplierId: 'ID Furnizor',
            pricePerUnit: 'Preț per Unitate',
            selectedSupplier: 'Furnizor Selectat',
            undispatched: 'Neexpediat',
            dispatched: 'Expediat',
            delivered: 'Livrat',
            all: 'Toate',
            filter: 'Filtru',
            status: 'Stare',
            dispatchDate: 'Data Expedierii',
            deliveryDate: 'Data Livrării',
            plantId: 'ID Fabrică',
            action: 'Acțiune',
            dispatch: 'Expediere',
            deliver: 'Livrare',
            type: 'Tip',
            quantityDifference: 'Diferență Cantitate',
            timeDifference: 'Diferență Timp',
            deviationTypes: 'Tipuri Deviații',
            qtyUpperLimit: 'Limită Superioară Cantitate',
            qtyLowerLimit: 'Limită Inferioară Cantitate',
            dayUpperLimit: 'Limită Superioară Zi',
            dayLowerLimit: 'Limită Inferioară Zi',
            addTolerance: 'Adaugă Toleranță',
            deleteTolerance: 'Șterge Toleranță',
            deleteToleranceDialog: 'Sigur doriți să ștergeți toleranța?',
            searchTolerance: 'Caută Toleranță',
            resetSearch: 'Resetare Căutare',
            supplierName: 'Nume Furnizor',
            update: 'Actualizare',
            delete: 'Ștergere',
            addContract: 'Adaugă Contract',
            deleteContract: 'Șterge Contract',
            deleteContractDialog: 'Sigur doriți să ștergeți contractul?',
            searchContract: 'Caută Contractul',
            itemsPerPage: 'Elemente per Pagină:',
        }
    };

    getTranslation(key: string): string {
        return this.translations[localStorage.getItem('language')][key];
    }
}