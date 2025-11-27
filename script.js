// ---------- DUMMY DATA ----------
const vehicleDB = {
    "ABC-123": {
        status: "Active",
        plate: "ABC-123",
        mvFile: "MV-2023-001234",
        make: "Toyota",
        model: "Camry",
        year: "2022",
        color: "Silver",
        vin: "1HGBH41JXMN109186",
        regExpiry: "2025-12-15",
        ownerName: "John Michael Doe",
        ownerLicense: "DL-2023-456789",
        ownerAddress: "123 Main Street, Springfield",
        insuranceCompany: "State Farm Insurance",
        policyNumber: "POL-987654321",
        insuranceExpiry: "2025-11-30"
    }
};

const licenseDB = {
    "DL-2023-456789": {
        status: "Valid",
        licenseNumber: "DL-2023-456789",
        type: "Class A",
        issueDate: "2023-01-10",
        expiryDate: "2028-01-10",
        name: "John Michael Doe",
        birthdate: "1985-03-15",
        address: "123 Main Street, Springfield",
        sex: "Male",
        height: "5'10\"",
        weight: "180 lbs",
        eyeColor: "Brown",
        restrictions: "None",
        endorsements: "Motorcycle",
        violations: [
            { date: "2024-01-10", offense: "Speeding", location: "Highway 1", note: "Exceeded speed limit", status: "Unsettled" },
            { date: "2023-08-05", offense: "Illegal parking", location: "Market Street", note: "Parked in no-parking zone", status: "Paid" }
        ]
    }
};

// ---------- STATE ----------
let currentLicense = null;

// ---------- HELPERS ----------
function normalize(str) {
    return String(str || "").trim().toLowerCase();
}

function showError(message = "Record not found. Please check your input.") {
    const error = document.getElementById("error");
    const box = document.getElementById("infoBox");
    if (box) box.classList.add("hidden");
    if (error) {
        error.textContent = message;
        error.classList.remove("hidden");
    }
}

function clearError() {
    const error = document.getElementById("error");
    if (error) error.classList.add("hidden");
}

// ---------- VEHICLE LOOKUP ----------
function lookupVehicle() {
    const inputEl = document.getElementById("vehicleInput") || document.getElementById("plateInput");
    const input = inputEl ? inputEl.value.trim() : "";
    const box = document.getElementById("infoBox");

    clearError();
    if (!input) {
        showError("Please enter a Plate Number or MV File Number.");
        return;
    }

    const normInput = normalize(input);

    // Try direct plate key match
    let vehicle = Object.values(vehicleDB).find(v => normalize(v.plate) === normInput);

    // If not found, try MV File number
    if (!vehicle) {
        vehicle = Object.values(vehicleDB).find(v => normalize(v.mvFile) === normInput);
    }

    if (!vehicle) {
        showError();
        return;
    }

    const ownerLicenseLink = vehicle.ownerLicense
        ? `<a href="#" class="text-blue-600 underline" onclick="lookupLicense('${vehicle.ownerLicense}'); return false;">${vehicle.ownerLicense}</a>`
        : "N/A";

    box.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl p-6 space-y-4">
            <h2 class="text-2xl font-bold mb-2">Vehicle Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <p><b>Status:</b> ${vehicle.status}</p>
                <p><b>Plate Number:</b> ${vehicle.plate}</p>
                <p><b>MV File Number:</b> ${vehicle.mvFile}</p>
                <p><b>Make:</b> ${vehicle.make}</p>
                <p><b>Model:</b> ${vehicle.model}</p>
                <p><b>Year:</b> ${vehicle.year}</p>
                <p><b>Color:</b> ${vehicle.color}</p>
                <p><b>VIN:</b> ${vehicle.vin}</p>
                <p><b>Registration Expiry:</b> ${vehicle.regExpiry}</p>
            </div>

            <h3 class="text-xl font-bold mt-4">Registered Owner</h3>
            <p><b>Name:</b> ${vehicle.ownerName}</p>
            <p><b>License Number:</b> ${ownerLicenseLink}</p>
            <p><b>Address:</b> ${vehicle.ownerAddress}</p>

            <h3 class="text-xl font-bold mt-4">Insurance Information</h3>
            <p><b>Insurance Company:</b> ${vehicle.insuranceCompany}</p>
            <p><b>Policy No.:</b> ${vehicle.policyNumber}</p>
            <p><b>Expiry Date:</b> ${vehicle.insuranceExpiry}</p>
        </div>
    `;
    box.classList.remove("hidden");
}

// ---------- LICENSE LOOKUP ----------
function lookupLicense(licParam = null) {
    const licenseInputEl = document.getElementById("licenseInput");
    const lic = licParam ? String(licParam).trim() : (licenseInputEl ? licenseInputEl.value.trim() : "");
    const box = document.getElementById("infoBox");

    if (!lic) {
        showError("Please enter a License Number.");
        return;
    }

    const matched = Object.keys(licenseDB).find(key => normalize(key) === normalize(lic));
    if (!matched) {
        showError();
        return;
    }

    clearError();
    currentLicense = licenseDB[matched];
    box.classList.remove("hidden");

    const L = currentLicense;

    box.innerHTML = `
        <div class="bg-white p-6 rounded-2xl shadow-xl mb-6">
            <h2 class="text-2xl font-bold mb-3">License Status</h2>
            <p><b>Status:</b> ${L.status}</p>
            <p><b>License Number:</b> ${L.licenseNumber}</p>
            <p><b>License Type:</b> ${L.type}</p>
            <p><b>Issue Date:</b> ${L.issueDate}</p>
            <p><b>Expiry Date:</b> ${L.expiryDate}</p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-xl mb-6">
            <h2 class="text-2xl font-bold mb-3">Personal Information</h2>
            <p><b>Full Name:</b> ${L.name}</p>
            <p><b>Date of Birth:</b> ${L.birthdate}</p>
            <p><b>Address:</b> ${L.address}</p>
            <p><b>Sex:</b> ${L.sex}</p>
            <p><b>Height:</b> ${L.height}</p>
            <p><b>Weight:</b> ${L.weight}</p>
            <p><b>Eye Color:</b> ${L.eyeColor}</p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-xl mb-6">
            <h2 class="text-2xl font-bold mb-3">License Details</h2>
            <p><b>Restrictions:</b> ${L.restrictions}</p>
            <p><b>Endorsements:</b> ${L.endorsements}</p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-xl mb-6 overflow-x-auto">
            <h2 class="text-2xl font-bold mb-4">Violation History</h2>
            <table class="w-full border-collapse">
                <thead class="bg-gray-200 sticky top-0">
                    <tr>
                        <th class="border px-3 py-2 text-left">Date</th>
                        <th class="border px-3 py-2 text-left">Offense</th>
                        <th class="border px-3 py-2 text-left">Place</th>
                        <th class="border px-3 py-2 text-left">Notes</th>
                        <th class="border px-3 py-2 text-left">Status</th>
                    </tr>
                </thead>
                <tbody id="violationTable"></tbody>
            </table>
        </div>

        <!-- Add Violation Modal Trigger Button -->
        <button id="showViolationFormBtn" 
            class="bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-3 rounded-xl hover:from-green-600 hover:to-green-800 transition font-bold mb-4">
            Add New Ticket Violation
        </button>

        <!-- Modal -->
        <div id="violationModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative">
                <button onclick="toggleViolationModal()" class="absolute top-3 right-3 text-gray-600 font-bold text-xl">&times;</button>
                <h2 class="text-2xl font-bold mb-4">Add New Ticket Violation</h2>
                <div class="mb-3">
                    <label class="font-semibold">Date of Violation:</label>
                    <input id="v_date" type="date" class="p-2 border rounded w-full">
                </div>
                <div class="mb-3">
                    <label class="font-semibold">Offense Description:</label>
                    <input id="v_offense" type="text" class="p-2 border rounded w-full">
                </div>
                <div class="mb-3">
                    <label class="font-semibold">Place of Incident:</label>
                    <input id="v_place" type="text" class="p-2 border rounded w-full">
                </div>
                <div class="mb-3">
                    <label class="font-semibold">Note:</label>
                    <textarea id="v_note" class="p-2 border rounded w-full"></textarea>
                </div>
                <button onclick="addViolation(); toggleViolationModal();" 
                    class="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-3 rounded-xl hover:from-blue-600 hover:to-blue-800 transition font-bold w-full">
                    Submit Violation
                </button>
            </div>
        </div>
    `;

    loadViolations();

    // Attach click event to modal button
    const btn = document.getElementById("showViolationFormBtn");
    if (btn) {
        btn.addEventListener("click", toggleViolationModal);
    }
}

// Modal toggle function
function toggleViolationModal() {
    const modal = document.getElementById("violationModal");
    if (!modal) return;
    modal.classList.toggle("hidden");
}


// ---------- VIOLATION HISTORY ----------
function loadViolations() {
    const table = document.getElementById("violationTable");
    if (!table || !currentLicense) return;
    table.innerHTML = "";
    currentLicense.violations.forEach(v => {
        table.innerHTML += `
            <tr>
                <td class="border px-3 py-1">${v.date}</td>
                <td class="border px-3 py-1">${v.offense}</td>
                <td class="border px-3 py-1">${v.location}</td>
                <td class="border px-3 py-1">${v.note}</td>
                <td class="border px-3 py-1 font-semibold ${v.status === "Paid" ? "text-green-600" : "text-red-600"}">${v.status}</td>
            </tr>
        `;
    });
}

// ---------- ADD NEW VIOLATION ----------
function addViolation() {
    if(!currentLicense) {
        alert("No license selected. Search for a license first.");
        return;
    }

    const date = document.getElementById("v_date").value;
    const offense = document.getElementById("v_offense").value.trim();
    const place = document.getElementById("v_place").value.trim();
    const note = document.getElementById("v_note").value.trim();

    if(!date || !offense || !place) {
        alert("Please fill in the date, offense and place fields.");
        return;
    }

    const newV = {
        date,
        offense,
        location: place,
        note,
        status: "Unsettled"
    };

    currentLicense.violations.push(newV);
    licenseDB[currentLicense.licenseNumber] = currentLicense;

    loadViolations();

    document.getElementById("v_date").value = "";
    document.getElementById("v_offense").value = "";
    document.getElementById("v_place").value = "";
    document.getElementById("v_note").value = "";

    alert("Violation added successfully!");
}

// ---------- TOGGLE FORM VISIBILITY ----------
function toggleViolationForm() {
    const form = document.getElementById("violationForm");
    if (!form) return;
    form.classList.toggle("hidden");
}
