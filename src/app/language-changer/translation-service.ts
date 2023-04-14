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
            stepOne: 'Step one - add information',
            stepTwo: 'Step two - select plant',
            stepThree: 'Step three - select contract',
            id: 'ID',
            segment: 'Segment',
            country: 'Country',
            city: 'City',
            selectedPlant: 'Selected plant',
            supplierId: 'Supplier ID',
            pricePerUnit: 'Price per Unit',
            selectedSupplier: 'Selected supplier',
            undispatched: 'undispatched',
            dispatched: 'dispatched',
            delivered: 'delivered',
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
            registrationSuccessful: 'Registration successful',
            loginNowDialog: 'You may now login.',
            days: 'days',
            electrical: 'electrical',
            components: 'components',
            batteries: 'batteries',
            interior: 'interior',
            creationDate: 'Creation Date',
            close: 'Close',
            deliveryDispatched: 'Delivery dispatched',
            deliveryDelivered: 'Delivery delivered',
            contractAdded: 'Contract added',
            contractUpdated: 'Contract updated',
            contractDeleted: 'Contract deleted',
            toleranceAdded: 'Tolerance added',
            toleranceUpdated: 'Tolerance updated',
            toleranceDeleted: 'Tolerance deleted',
            realQuantity: 'Real Quantity',
            name: 'Name',
            cityCountry: 'City and country',
            totalNumberDeliveries: 'Total number of deliveries',
            correctDeliveriesPercentage: 'Correct deliveries percentage',
            qtyDeviationCurveRating: 'Quantity deviation rating(0-1)',
            dayDeviationCurveRating: 'Day deviation rating(0-1)',
            averageNumberOfHoursToDeliver: 'Average number of hours to deliver',
            systemConfigurations: 'System configurations',
            configGroup: 'Configuration group',
            configName: 'Configuration name',
            configValues: 'Configuration values',
            key: 'Key',
            value: 'Value',
            minDeliveries: 'Minimum deliveries',
            medPercQtyMinusWeight: 'Average percentage for quantity minus deviations weight',
            medPercQtyPlusWeight: 'Average percentage for quantity plus deviations weight',
            medDaysDayMinusWeight: 'Average percentage for day minus deviations weight',
            medDaysDayPlusWeight: 'Average percentage for day plus deviations weight',
            qtyMinusDeviNumberWeight: 'Number of quantity minus deviations weight',
            qtyPlusDeviNumberWeight: 'Number of quantity plus deviations weight',
            dayMinusDeviNumberWeight: 'Number of day minus deviations weight',
            dayPlusDeviNumberWeight: 'Number of day plus deviations weight',
            qtyDeviWeight: 'Quantity deviations weight',
            dayDeviWeight: 'Day deviations weight',
            priceWeight: 'Price differences weight',
            age: 'Age',
            addDeliveryDate: 'Add delivery date',
            averageNumberOfHoursLeadTime: 'Average number of hours for lead time',
            searchDelivery: 'Search delivery',
            searchDeviation: 'Search deviation',
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
            stepOne: 'Pasul Unu - adaugare informatii',
            stepTwo: 'Pasul Doi - selectare fabrica',
            stepThree: 'Pasul Trei - selectare contract',
            id: 'ID',
            segment: 'Segment',
            country: 'Țară',
            city: 'Oraș',
            selectedPlant: 'Fabrica Selectată',
            supplierId: 'ID Furnizor',
            pricePerUnit: 'Preț per Unitate',
            selectedSupplier: 'Furnizor Selectat',
            undispatched: 'neexpediat',
            dispatched: 'expediat',
            delivered: 'livrat',
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
            registrationSuccessful: 'Înregistrare cu succes',
            loginNowDialog: 'Acum vă puteți autentifica',
            days: 'zile',
            electrical: 'electric',
            components: 'componente',
            batteries: 'baterii',
            interior: 'interior',
            creationDate: 'Data Creării',
            close: 'Închide',
            deliveryDispatched: 'Livrare expediată',
            deliveryDelivered: 'Livrare livrată',
            contractAdded: 'Contract adăugat',
            contractUpdated: 'Contract actualizat',
            contractDeleted: 'Contract șters',
            toleranceAdded: 'Toleranță adăugată',
            toleranceUpdated: 'Toleranță actualizată',
            toleranceDeleted: 'Toleranță ștearsă',
            realQuantity: 'Cantitate Reală',
            name: 'Nume',
            cityCountry: 'Oraș și țară',
            totalNumberDeliveries: 'Număr total de livrări',
            correctDeliveriesPercentage: 'Procent de livrări corecte',
            qtyDeviationCurveRating: 'Nota pentru deviații de cantitate(0-1)',
            dayDeviationCurveRating: 'Nota pentru deviații de zi(0-1)',
            averageNumberOfHoursToDeliver: 'Numărul mediu de ore pentru livrare',
            systemConfigurations: 'Configurațiile sistemului',
            configGroup: 'Grup configurație',
            configName: 'Nume configurație',
            configValues: 'Valori configurație',
            key: 'Cheie',
            value: 'Valoare',
            minDeliveries: 'Minim livrări',
            medPercQtyMinusWeight: 'Greutate pentru procentul mediu pentru deviații de cantitate în minus',
            medPercQtyPlusWeight: 'Greutate pentru procentul mediu pentru deviații de cantitate în plus',
            medDaysDayMinusWeight: 'Greutate pentru procentul mediu pentru deviații de zi în minus',
            medDaysDayPlusWeight: 'Greutate pentru procentul mediu pentru deviații de zi în plus',
            qtyMinusDeviNumberWeight: 'Greutate pentru numărul de deviații de cantitate în minus',
            qtyPlusDeviNumberWeight: 'Greutate pentru numărul de deviații de cantitate în plus',
            dayMinusDeviNumberWeight: 'Greutate pentru numărul de deviații de zi în minus',
            dayPlusDeviNumberWeight: 'Greutate pentru numărul de deviații de zi în plus',
            qtyDeviWeight: 'Greutate pentru deviațiile de cantitate',
            dayDeviWeight: 'Greutate pentru deviațiile de zi',
            priceWeight: 'Greutate pentru diferențele de preț',
            age: 'Vârstă',
            addDeliveryDate: 'Data adaugarii livrarii',
            averageNumberOfHoursLeadTime: 'Termenul de livrare mediu in ore',
            searchDelivery: 'Caută livrare',
            searchDeviation: 'Caută deviație',
        }
    };

    getTranslation(key: string): string {
        return this.translations[localStorage.getItem('language')][key];
    }
}
