import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private translations = {
        es: {
            loginUsernameLabel: 'Nombre de usuario',
            loginPasswordLabel: 'Contraseña',
            loginButton: 'Iniciar sesión',
            registerButton: 'Registrarse',
            emailLabel: 'Dirección de correo electrónico',
            resetPasswordLabel: 'Restablecer contraseña',
            firstNameLabel: 'Nombre',
            lastNameLabel: 'Apellido',
            usernameRequiredError: 'Se requiere nombre de usuario',
            passwordRequiredError: 'Se requiere contraseña',
            emailRequiredError: 'Se requiere correo electrónico',
            firstNameRequiredError: 'Se requiere nombre',
            lastNameRequiredError: 'Se requiere apellido',
            invalidEmailError: 'Formato de correo electrónico no válido',
            incorrectUsernamePassword: 'Nombre de usuario o contraseña incorrectos',
            greetingsLabel: 'Hola',
            deliveriesLabel: 'Entregas',
            deviationsLabel: 'Desviaciones',
            tolerancesLabel: 'Tolerancias',
            contractsLabel: 'Contratos',
            logoutButton: 'Cerrar sesión',
            deliveryStatusLabel: 'Estado de entrega',
            addDelivery: 'Agregar entrega',
            dispatchDeliveryTitle: 'Despachar entrega',
            dispatchDeliveryQuestion: '¿Está seguro de que desea despachar la entrega?',
            yes: 'Sí',
            no: 'No',
            deliverDeliveryTitle: 'Entregar entrega',
            realQuantityLabel: 'Cantidad real entregada',
            realQuantityPlaceholder: 'Cantidad real',
            cancel: 'Cancelar',
            submit: 'Enviar',
            deviationDetectedTitle: 'Desviación detectada',
            continue: 'Continuar',
            materialCode: 'Código de material',
            expectedQuantity: 'Cantidad esperada',
            expectedDeliveryDate: 'Fecha de entrega esperada',
            next: 'Siguiente',
            stepOne: 'Paso uno - agregar información',
            stepTwo: 'Paso dos - seleccionar planta',
            stepThree: 'Paso tres - seleccionar contrato',
            id: 'ID',
            segment: 'Segmento',
            country: 'País',
            city: 'Ciudad',
            selectedPlant: 'Planta seleccionada',
            supplierId: 'ID del proveedor',
            pricePerUnit: 'Precio por unidad',
            selectedSupplier: 'Proveedor seleccionado',
            undispatched: 'no despachado',
            dispatched: 'despachado',
            delivered: 'entregado',
            all: 'Todos',
            filter: 'Filtrar',
            status: 'Estado',
            dispatchDate: 'Fecha de despacho',
            deliveryDate: 'Fecha de entrega',
            plantId: 'ID de planta',
            action: 'Acción',
            dispatch: 'Despachar',
            deliver: 'Entregar',
            type: 'Tipo',
            quantityDifference: 'Diferencia de cantidad',
            timeDifference: 'Diferencia de tiempo',
            deviationTypes: 'Tipos de desviación',
            qtyUpperLimit: 'Límite superior de cantidad',
            qtyLowerLimit: 'Límite inferior de cantidad',
            dayUpperLimit: 'Límite superior de día',
            dayLowerLimit: 'Límite inferior de día',
            addTolerance: 'Agregar tolerancia',
            deleteTolerance: 'Eliminar tolerancia',
            deleteToleranceDialog: '¿Está seguro de que desea eliminar la tolerancia?',
            searchTolerance: 'Buscar tolerancia',
            resetSearch: 'Restablecer búsqueda',
            supplierName: 'Nombre del proveedor',
            update: 'Actualizar',
            delete: 'Eliminar',
            addContract: 'Agregar contrato',
            deleteContract: 'Eliminar contrato',
            deleteContractDialog: '¿Está seguro de que desea eliminar el contrato?',
            searchContract: 'Buscar contrato',
            itemsPerPage: 'Elementos por página:',
            registrationSuccessful: 'Registro exitoso',
            loginNowDialog: 'Ahora puede iniciar sesión.',
            days: 'días',
            electrical: 'eléctrico',
            components: 'componentes',
            batteries: 'baterías',
            interior: 'interior',
            creationDate: 'Fecha de creación',
            close: 'Cerrar',
            deliveryDispatched: 'Entrega despachada',
            deliveryDelivered: 'Entrega entregada',
            contractAdded: 'Contrato agregado',
            contractUpdated: 'Contrato actualizado',
            contractDeleted: 'Contrato eliminado',
            toleranceAdded: 'Tolerancia agregada',
            toleranceUpdated: 'Tolerancia actualizada',
            toleranceDeleted: 'Tolerancia eliminada',
            realQuantity: 'Cantidad real',
            name: 'Nombre',
            cityCountry: 'Ciudad y país',
            totalNumberDeliveries: 'Número total de entregas',
            correctDeliveriesPercentage: 'Porcentaje de entregas correctas',
            qtyDeviationCurveRating: 'Porcentaje de desviación de cantidad de calificación',
            dayDeviationCurveRating: 'Porcentaje de desviación de día de calificación',
            averageNumberOfHoursToDeliver: 'Número promedio de horas para entregar',
            systemConfigurations: 'Configuraciones del sistema',
            configGroup: 'Grupo de configuración',
            configName: 'Nombre de configuración',
            configValues: 'Valores de configuración',
            key: 'Clave',
            value: 'Valor',
            minDeliveries: 'Entregas mínimas',
            medPercQtyMinusWeight: 'Porcentaje promedio para cantidad menos peso de desviaciones',
            medPercQtyPlusWeight: 'Porcentaje promedio para cantidad más peso de desviaciones',
            medDaysDayMinusWeight: 'Porcentaje promedio para día menos peso de desviaciones',
            medDaysDayPlusWeight: 'Porcentaje promedio para día más peso de desviaciones',
            qtyMinusDeviNumberWeight: 'Número de cantidad menos peso de desviaciones',
            qtyPlusDeviNumberWeight: 'Número de cantidad más peso de desviaciones',
            dayMinusDeviNumberWeight: 'Número de día menos peso de desviaciones',
            dayPlusDeviNumberWeight: 'Número de día más peso de desviaciones',
            qtyDeviWeight: 'Peso de desviaciones de cantidad',
            dayDeviWeight: 'Peso de desviaciones de día',
            priceWeight: 'Peso de diferencias de precio',
            age: 'Edad',
            addDeliveryDate: 'Agregar fecha de entrega',
            averageNumberOfHoursLeadTime: 'Número promedio de horas para el tiempo de espera',
            searchDelivery: 'Buscar entrega',
            searchDeviation: 'Buscar desviación',
            ratingsLabel: 'Estadísticas',
            curveCorrectPerc: 'Calificaciones de desviación y entregas correctas',
            priceDeviation: 'Desviación de precio',
            distanceToPlant: 'Distancia a la planta',
            averageHours: 'Horas promedio',
            table: 'Tabla',
            global: 'Global',
            material: 'Material',
            plant: 'Planta',
            specific: 'Específico',
            ratingType: 'Tipo de calificación',
            chart: 'Gráfico',
            searchRating: 'Buscar calificación',
            rating01: 'Calificaciones 0-1',
            legend: 'Leyenda',
            qtyNrDevisRating: 'Calificación del número de desviación de cantidad',
            dayNrDevisRating: 'Calificación del número de desviación de día',
            averageLeadTimeInHours: 'Tiempo promedio de espera en horas',
            calculateRatings: 'Calcular calificaciones',
            calculateRatingsTitle: 'Calcular calificaciones',
            calculateRatingsQuestion: '¿Está seguro de que desea recalcular las calificaciones? Esto eliminará las calificaciones existentes.',
            quantityBySupplierMaterialPlant: 'Cantidad entregada por día',
            totalQuantityBySupplierMaterialPlant: 'Cantidad total entregada por día',
            totalNrDeliveriesPieChart: 'Número total de entregas - gráfico circular',
            totalQuantityNoDays: 'Cantidad total entregada',
            map: 'Mapa',
            latitude: 'Latitud',
            longitude: 'Longitud',
            generateEmailReport: 'Generar informe por correo electrónico',
            reportChoices: 'Configuraciones de informe de usuario',
            modifyChoices: 'Modificar configuraciones',
            emailSent: 'Correo electrónico enviado',
            modifiedReportChoices: 'Opciones de informe modificadas',
            chooseADate: 'Elegir una fecha',
            dateRange: 'Rango de fechas',
            startDate: 'Fecha de inicio',
            endDate: 'Fecha de fin',
        },
        de: {
            loginUsernameLabel: 'Benutzername',
            loginPasswordLabel: 'Passwort',
            loginButton: 'Anmelden',
            registerButton: 'Registrieren',
            emailLabel: 'E-Mail-Adresse',
            resetPasswordLabel: 'Passwort zurücksetzen',
            firstNameLabel: 'Vorname',
            lastNameLabel: 'Nachname',
            usernameRequiredError: 'Benutzername ist erforderlich',
            passwordRequiredError: 'Passwort ist erforderlich',
            emailRequiredError: 'E-Mail ist erforderlich',
            firstNameRequiredError: 'Vorname ist erforderlich',
            lastNameRequiredError: 'Nachname ist erforderlich',
            invalidEmailError: 'Ungültiges E-Mail-Format',
            incorrectUsernamePassword: 'Benutzername oder Passwort falsch',
            greetingsLabel: 'Hallo',
            deliveriesLabel: 'Lieferungen',
            deviationsLabel: 'Abweichungen',
            tolerancesLabel: 'Toleranzen',
            contractsLabel: 'Verträge',
            logoutButton: 'Abmelden',
            deliveryStatusLabel: 'Lieferstatus',
            addDelivery: 'Lieferung hinzufügen',
            dispatchDeliveryTitle: 'Lieferung versenden',
            dispatchDeliveryQuestion: 'Möchten Sie die Lieferung wirklich versenden?',
            yes: 'Ja',
            no: 'Nein',
            deliverDeliveryTitle: 'Lieferung zustellen',
            realQuantityLabel: 'Tatsächliche Menge geliefert',
            realQuantityPlaceholder: 'Tatsächliche Menge',
            cancel: 'Abbrechen',
            submit: 'Senden',
            deviationDetectedTitle: 'Abweichung erkannt',
            continue: 'Weiter',
            materialCode: 'Materialcode',
            expectedQuantity: 'Erwartete Menge',
            expectedDeliveryDate: 'Erwartetes Lieferdatum',
            next: 'Weiter',
            stepOne: 'Schritt eins - Informationen hinzufügen',
            stepTwo: 'Schritt zwei - Pflanze auswählen',
            stepThree: 'Schritt drei - Vertrag auswählen',
            id: 'ID',
            segment: 'Segment',
            country: 'Land',
            city: 'Stadt',
            selectedPlant: 'Ausgewählte Pflanze',
            supplierId: 'Lieferanten-ID',
            pricePerUnit: 'Preis pro Einheit',
            selectedSupplier: 'Ausgewählter Lieferant',
            undispatched: 'nicht versendet',
            dispatched: 'versendet',
            delivered: 'geliefert',
            all: 'Alle',
            filter: 'Filtern',
            status: 'Status',
            dispatchDate: 'Versanddatum',
            deliveryDate: 'Lieferdatum',
            plantId: 'Pflanzen-ID',
            action: 'Aktion',
            dispatch: 'Versenden',
            deliver: 'Zustellen',
            type: 'Typ',
            quantityDifference: 'Mengenunterschied',
            timeDifference: 'Zeitunterschied',
            deviationTypes: 'Abweichungstypen',
            qtyUpperLimit: 'Obergrenze Menge',
            qtyLowerLimit: 'Untergrenze Menge',
            dayUpperLimit: 'Obergrenze Tag',
            dayLowerLimit: 'Untergrenze Tag',
            addTolerance: 'Toleranz hinzufügen',
            deleteTolerance: 'Toleranz löschen',
            deleteToleranceDialog: 'Möchten Sie die Toleranz wirklich löschen?',
            searchTolerance: 'Toleranz suchen',
            resetSearch: 'Suche zurücksetzen',
            supplierName: 'Lieferantenname',
            update: 'Aktualisieren',
            delete: 'Löschen',
            addContract: 'Vertrag hinzufügen',
            deleteContract: 'Vertrag löschen',
            deleteContractDialog: 'Möchten Sie den Vertrag wirklich löschen?',
            searchContract: 'Vertrag suchen',
            itemsPerPage: 'Einträge pro Seite:',
            registrationSuccessful: 'Registrierung erfolgreich',
            loginNowDialog: 'Sie können sich jetzt anmelden.',
            days: 'Tage',
            electrical: 'elektrisch',
            components: 'Komponenten',
            batteries: 'Batterien',
            interior: 'Innenraum',
            creationDate: 'Erstellungsdatum',
            close: 'Schließen',
            deliveryDispatched: 'Lieferung versendet',
            deliveryDelivered: 'Lieferung geliefert',
            contractAdded: 'Vertrag hinzugefügt',
            contractUpdated: 'Vertrag aktualisiert',
            contractDeleted: 'Vertrag gelöscht',
            toleranceAdded: 'Toleranz hinzugefügt',
            toleranceUpdated: 'Toleranz aktualisiert',
            toleranceDeleted: 'Toleranz gelöscht',
            realQuantity: 'Tatsächliche Menge',
            name: 'Name',
            cityCountry: 'Stadt und Land',
            totalNumberDeliveries: 'Gesamtzahl der Lieferungen',
            correctDeliveriesPercentage: 'Prozentsatz korrekter Lieferungen',
            qtyDeviationCurveRating: 'Bewertung der Mengenabweichung',
            dayDeviationCurveRating: 'Bewertung der Tagesabweichung',
            averageNumberOfHoursToDeliver: 'Durchschnittliche Anzahl Stunden bis zur Lieferung',
            systemConfigurations: 'Systemkonfigurationen',
            configGroup: 'Konfigurationsgruppe',
            configName: 'Konfigurationsname',
            configValues: 'Konfigurationswerte',
            key: 'Schlüssel',
            value: 'Wert',
            minDeliveries: 'Mindestanzahl Lieferungen',
            medPercQtyMinusWeight: 'Durchschnittlicher Prozentsatz für Mengenabweichungen minus Gewichtung',
            medPercQtyPlusWeight: 'Durchschnittlicher Prozentsatz für Mengenabweichungen plus Gewichtung',
            medDaysDayMinusWeight: 'Durchschnittlicher Prozentsatz für Tagesabweichungen minus Gewichtung',
            medDaysDayPlusWeight: 'Durchschnittlicher Prozentsatz für Tagesabweichungen plus Gewichtung',
            qtyMinusDeviNumberWeight: 'Anzahl der Mengenabweichungen minus Gewichtung',
            qtyPlusDeviNumberWeight: 'Anzahl der Mengenabweichungen plus Gewichtung',
            dayMinusDeviNumberWeight: 'Anzahl der Tagesabweichungen minus Gewichtung',
            dayPlusDeviNumberWeight: 'Anzahl der Tagesabweichungen plus Gewichtung',
            qtyDeviWeight: 'Gewichtung der Mengenabweichungen',
            dayDeviWeight: 'Gewichtung der Tagesabweichungen',
            priceWeight: 'Preisabweichungen Gewichtung',
            age: 'Alter',
            addDeliveryDate: 'Lieferdatum hinzufügen',
            averageNumberOfHoursLeadTime: 'Durchschnittliche Anzahl Stunden Vorlaufzeit',
            searchDelivery: 'Lieferung suchen',
            searchDeviation: 'Abweichung suchen',
            ratingsLabel: 'Statistiken',
            curveCorrectPerc: 'Abweichungsbewertungen und korrekte Lieferungen',
            priceDeviation: 'Preisabweichung',
            distanceToPlant: 'Entfernung zur Pflanze',
            averageHours: 'Durchschnittsstunden',
            table: 'Tabelle',
            global: 'Global',
            material: 'Material',
            plant: 'Pflanze',
            specific: 'Spezifisch',
            ratingType: 'Bewertungstyp',
            chart: 'Diagramm',
            searchRating: 'Bewertung suchen',
            rating01: 'Bewertung 0-1',
            legend: 'Legende',
            qtyNrDevisRating: 'Bewertung der Mengenabweichungsnummer',
            dayNrDevisRating: 'Bewertung der Tagesabweichungsnummer',
            averageLeadTimeInHours: 'Durchschnittliche Vorlaufzeit in Stunden',
            calculateRatings: 'Bewertungen berechnen',
            calculateRatingsTitle: 'Bewertungen berechnen',
            calculateRatingsQuestion: 'Möchten Sie die Bewertungen wirklich neu berechnen? Dies löscht vorhandene Bewertungen.',
            quantityBySupplierMaterialPlant: 'Gelieferte Menge nach Tag',
            totalQuantityBySupplierMaterialPlant: 'Gesamtliefermenge nach Tag',
            totalNrDeliveriesPieChart: 'Gesamtzahl der Lieferungen - Kreisdiagramm',
            totalQuantityNoDays: 'Gesamtliefermenge',
            map: 'Karte',
            latitude: 'Breitengrad',
            longitude: 'Längengrad',
            generateEmailReport: 'E-Mail-Bericht generieren',
            reportChoices: 'Benutzerberichtskonfigurationen',
            modifyChoices: 'Konfigurationen ändern',
            emailSent: 'E-Mail gesendet',
            modifiedReportChoices: 'Geänderte Berichtsoptionen',
            chooseADate: 'Wählen Sie ein Datum',
            dateRange: 'Datumsbereich',
            startDate: 'Startdatum',
            endDate: 'Enddatum',
        },
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
            qtyDeviationCurveRating: 'Quantity deviation percentage rating',
            dayDeviationCurveRating: 'Day deviation percentage rating',
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
            ratingsLabel: 'Statistics',
            curveCorrectPerc: 'Deviation ratings and correct deliveries',
            priceDeviation: 'Price deviation',
            distanceToPlant: 'Distance to plant',
            averageHours: 'Average hours',
            table: 'Table',
            global: 'Global',
            material: 'Material',
            plant: 'Plant',
            specific: 'Specific',
            ratingType: 'Rating type',
            chart: 'Chart',
            searchRating: 'Search ratings',
            rating01: 'Ratings 0-1',
            legend: 'Legend',
            qtyNrDevisRating: 'Quantity deviation number rating',
            dayNrDevisRating: 'Day deviation number rating',
            averageLeadTimeInHours: 'Average lead time in hours',
            calculateRatings: 'Calculate ratings',
            calculateRatingsTitle: 'Calculate ratings',
            calculateRatingsQuestion: 'Are you sure you want to recalculate ratings? This will delete existing ratings.',
            quantityBySupplierMaterialPlant: 'Delivered quantity by day',
            totalQuantityBySupplierMaterialPlant: 'Total delivered quantity by day',
            totalNrDeliveriesPieChart: 'Total number of deliveries - pie chart',
            totalQuantityNoDays: 'Total delivered quantity',
            map: 'Map',
            latitude: 'Latitude',
            longitude: 'Longitude',
            generateEmailReport: 'Generate mail report',
            reportChoices: 'User report configurations',
            modifyChoices: 'Modify configurations',
            emailSent: 'Email sent',
            modifiedReportChoices: 'Modified report choices',
            chooseADate: 'Choose a date',
            dateRange: 'Date range',
            startDate: 'Start date',
            endDate: 'End date',
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
            qtyDeviationCurveRating: 'Nota pentru procentul de deviații de cantitate',
            dayDeviationCurveRating: 'Nota pentru procentul de deviații de zi',
            averageNumberOfHoursToDeliver: 'Numărul mediu de ore pentru livrare',
            systemConfigurations: 'Configurațiile sistemului',
            configGroup: 'Grup configurație',
            configName: 'Nume configurație',
            configValues: 'Valori configurație',
            key: 'Cheie',
            value: 'Valoare',
            minDeliveries: 'Minim livrări',
            medPercQtyMinusWeight: 'Pondere pentru procentul mediu pentru deviații de cantitate în minus',
            medPercQtyPlusWeight: 'Pondere pentru procentul mediu pentru deviații de cantitate în plus',
            medDaysDayMinusWeight: 'Pondere pentru procentul mediu pentru deviații de zi în minus',
            medDaysDayPlusWeight: 'Pondere pentru procentul mediu pentru deviații de zi în plus',
            qtyMinusDeviNumberWeight: 'Pondere pentru numărul de deviații de cantitate în minus',
            qtyPlusDeviNumberWeight: 'Pondere pentru numărul de deviații de cantitate în plus',
            dayMinusDeviNumberWeight: 'Pondere pentru numărul de deviații de zi în minus',
            dayPlusDeviNumberWeight: 'Pondere pentru numărul de deviații de zi în plus',
            qtyDeviWeight: 'Pondere pentru deviațiile de cantitate',
            dayDeviWeight: 'Pondere pentru deviațiile de zi',
            priceWeight: 'Pondere pentru diferențele de preț',
            age: 'Vârstă',
            addDeliveryDate: 'Data adaugarii livrarii',
            averageNumberOfHoursLeadTime: 'Termenul de livrare mediu in ore',
            searchDelivery: 'Caută livrare',
            searchDeviation: 'Caută deviație',
            ratingsLabel: 'Statistici',
            curveCorrectPerc: 'Evaluările deviațiilor și procent livrări corecte',
            priceDeviation: 'Deviația de preț',
            distanceToPlant: 'Distanța de fabrică',
            averageHours: 'Numărul de ore mediu',
            table: 'Tabel',
            global: 'Global',
            material: 'Material',
            plant: 'Fabrică',
            specific: 'Specific',
            ratingType: 'Tipul evaluării',
            chart: 'Grafic',
            searchRating: 'Caută evaluări',
            rating01: 'Evaluări 0-1',
            legend: 'Legendă',
            qtyNrDevisRating: 'Nota pentru numărul de deviații de cantitate',
            dayNrDevisRating: 'Nota pentru numărul de deviații de zi',
            averageLeadTimeInHours: 'Numărul de ore mediu pentru expediere',
            calculateRatings: 'Calculează evaluările',
            calculateRatingsTitle: 'Calculare evaluări',
            calculateRatingsQuestion: 'Sunteți sigur că doriți să recalculați evaluările? Acest lucru va șterge evaluările existente.',
            quantityBySupplierMaterialPlant: 'Cantitate livrată în fiecare zi',
            totalQuantityBySupplierMaterialPlant: 'Cantitate totală livrată în fiecare zi',
            totalNrDeliveriesPieChart: 'Număr total de livrări - pie chart',
            totalQuantityNoDays: 'Cantitate totală livrată',
            map: 'Hartă',
            latitude: 'Latitudine',
            longitude: 'Longitudine',
            generateEmailReport: 'Generare raport pe mail',
            reportChoices: 'Configurațiile de raport ale utilizatorului',
            modifyChoices: 'Modifică configurațiile',
            emailSent: 'Mail trimis',
            modifiedReportChoices: 'Configurații modificate',
            chooseADate: 'Alege o dată',
            dateRange: 'Intervalul de zile',
            startDate: 'Dată început',
            endDate: 'Dată final',
        }
    };

    getTranslation(key: string): string {
        return this.translations[localStorage.getItem('language')][key];
    }
}
