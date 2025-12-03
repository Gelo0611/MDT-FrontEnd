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
// -1 means adding new; otherwise index in currentLicense.violations being edited
let editingIndex = -1;

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
        showError("License not found.");
        return;
    }

    clearError();
    currentLicense = licenseDB[matched];
    box.classList.remove("hidden");

    const L = currentLicense;

    // Build the info content (violation table includes Actions + Print)
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
                        <th class="border px-3 py-2 text-left">#</th>
                        <th class="border px-3 py-2 text-left">Date</th>
                        <th class="border px-3 py-2 text-left">Offense</th>
                        <th class="border px-3 py-2 text-left">Place</th>
                        <th class="border px-3 py-2 text-left">Notes</th>
                        <th class="border px-3 py-2 text-left">Actions</th>
                        <th class="border px-3 py-2 text-left">Status</th>
                        <th class="border px-3 py-2 text-left">Print</th>
                    </tr>
                </thead>
                <tbody id="violationTable"></tbody>
            </table>
        </div>

        <!-- Add Violation Trigger (uses static modal in HTML) -->
        <button id="openAddBtn" 
            class="bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-3 rounded-xl hover:from-green-600 hover:to-green-800 transition font-bold mb-4">
            Add New Ticket Violation
        </button>
    `;

    // wire the Add button to open modal in "add" mode
    const openAddBtn = document.getElementById("openAddBtn");
    if (openAddBtn) openAddBtn.addEventListener("click", () => openAddViolationModal());

    loadViolations();
}

// ---------- VIOLATION HISTORY (render with Actions & Print) ----------
function loadViolations() {
    const table = document.getElementById("violationTable");
    if (!table || !currentLicense) return;
    table.innerHTML = "";
    currentLicense.violations.forEach((v, idx) => {
        const date = v.date || "";
        const offense = v.offense || "";
        const place = v.location || "";
        const note = v.note || "";
        const statusClass = v.status === "Paid" ? "text-green-600" : "text-red-600";

        // Use flex container in Actions column to ensure side-by-side buttons
        table.innerHTML += `
            <tr>
                <td class="border px-3 py-1 text-sm">${idx + 1}</td>
                <td class="border px-3 py-1 text-sm">${date}</td>
                <td class="border px-3 py-1 text-sm">${offense}</td>
                <td class="border px-3 py-1 text-sm">${place}</td>
                <td class="border px-3 py-1 text-sm">${note}</td>
                <td class="border px-3 py-1 text-sm">
                    <div class="inline-flex gap-2">
                        <button class="px-2 py-1 text-sm rounded bg-yellow-400 text-white" onclick="openEditViolation(${idx})">Edit</button>
                        <button class="px-2 py-1 text-sm rounded bg-red-500 text-white" onclick="deleteViolation(${idx})">Delete</button>
                    </div>
                </td>
                <td class="border px-3 py-1 text-sm font-semibold ${statusClass}">${v.status}</td>
                <td class="border px-3 py-1 text-sm">
                    <button class="px-2 py-1 rounded bg-blue-600 text-white text-sm" onclick="printViolation(${idx})">Print</button>
                </td>
            </tr>
        `;
    });
}

// ---------- ADD / EDIT MODAL HANDLERS ----------
function openAddViolationModal() {
    editingIndex = -1;
    document.getElementById("modalTitle").textContent = "Add New Ticket Violation";
    document.getElementById("modalSubmitBtn").textContent = "Add Violation";
    clearModalFields();
    showModal();
}

function openEditViolation(index) {
    if (!currentLicense || !currentLicense.violations[index]) return;
    editingIndex = index;
    const v = currentLicense.violations[index];
    document.getElementById("modalTitle").textContent = "Edit Ticket Violation";
    document.getElementById("modalSubmitBtn").textContent = "Save Changes";

    document.getElementById("modal_v_date").value = v.date || "";
    document.getElementById("modal_v_offense").value = v.offense || "";
    document.getElementById("modal_v_place").value = v.location || "";
    document.getElementById("modal_v_note").value = v.note || "";

    showModal();
}

// show modal (centered) and lock background scroll; also wire backdrop click
function showModal() {
    const modal = document.getElementById("addViolationModal");
    if (!modal) return;
    modal.classList.remove("hidden");

    // lock scroll
    document.documentElement.classList.add('overflow-y-hidden');

    // close when clicking on backdrop (but not when clicking inside card)
    modal.addEventListener('click', modalBackdropHandler);
}

// backdrop handler — close if click outside card
function modalBackdropHandler(e) {
    const card = document.getElementById('addViolationModalCard');
    if (!card) return;
    if (!card.contains(e.target)) {
        closeAddViolationModal();
    }
}

function closeAddViolationModal() {
    const modal = document.getElementById("addViolationModal");
    if (!modal) return;
    modal.classList.add("hidden");

    // restore scroll
    document.documentElement.classList.remove('overflow-y-hidden');

    // remove backdrop handler to avoid duplicates
    modal.removeEventListener('click', modalBackdropHandler);

    clearModalFields();
    editingIndex = -1;
    hideModalError();
}

function clearModalFields() {
    const f = ["modal_v_date","modal_v_offense","modal_v_place","modal_v_note"];
    f.forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; });
}

function showModalError(msg) {
    const el = document.getElementById("modalError");
    if (!el) return;
    el.textContent = msg;
    el.classList.remove("hidden");
}
function hideModalError() {
    const el = document.getElementById("modalError");
    if (!el) return;
    el.classList.add("hidden");
}

// Called by modal submit button
function addViolationFromModal() {
    const date = document.getElementById("modal_v_date").value;
    const offense = document.getElementById("modal_v_offense").value.trim();
    const place = document.getElementById("modal_v_place").value.trim();
    const note = document.getElementById("modal_v_note").value.trim();

    if (!date || !offense || !place) {
        showModalError("Please fill in the date, offense and place fields.");
        return;
    }

    // If editingIndex >= 0 => update existing
    if (editingIndex >= 0) {
        currentLicense.violations[editingIndex].date = date;
        currentLicense.violations[editingIndex].offense = offense;
        currentLicense.violations[editingIndex].location = place;
        currentLicense.violations[editingIndex].note = note;
        // keep status unchanged when editing (you can extend to edit status too)
    } else {
        // add new
        const newV = { date, offense, location: place, note, status: "Unsettled" };
        currentLicense.violations.push(newV);
    }

    // persist back to DB (in-memory)
    licenseDB[currentLicense.licenseNumber] = currentLicense;

    // refresh UI
    loadViolations();
    closeAddViolationModal();
    alert(editingIndex >= 0 ? "Violation updated successfully!" : "Violation added successfully!");
}

// ---------- DELETE ----------
function deleteViolation(index) {
    if (!currentLicense || !currentLicense.violations[index]) return;
    const ok = confirm("Are you sure you want to delete this violation?");
    if (!ok) return;
    currentLicense.violations.splice(index, 1);
    licenseDB[currentLicense.licenseNumber] = currentLicense;
    loadViolations();
    alert("Violation deleted.");
}

// ---------- PRINT ----------
function printViolation(index) {
    if (!currentLicense || !currentLicense.violations[index]) return;
    const v = currentLicense.violations[index];

    // Build printable HTML
    const printHtml = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Violation Ticket - ${currentLicense.licenseNumber}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; color: #111; }
    .ticket { border: 1px solid #222; padding: 16px; max-width: 600px; }
    .h { font-size: 18px; font-weight: bold; margin-bottom: 8px; }
    .row { margin-bottom: 6px; }
    .label { font-weight: bold; display:inline-block; width:150px; }
  </style>
</head>
<body>
  <div class="ticket">
    <div class="h">Violation Ticket</div>
    <div class="row"><span class="label">License #:</span> ${currentLicense.licenseNumber}</div>
    <div class="row"><span class="label">Name:</span> ${currentLicense.name}</div>
    <div class="row"><span class="label">Date of Violation:</span> ${v.date}</div>
    <div class="row"><span class="label">Offense:</span> ${v.offense}</div>
    <div class="row"><span class="label">Place:</span> ${v.location}</div>
    <div class="row"><span class="label">Note:</span> ${v.note}</div>
    <div class="row"><span class="label">Status:</span> ${v.status}</div>
    <div style="margin-top:12px; font-size:12px; color:#555;">Generated: ${new Date().toLocaleString()}</div>
  </div>
  <script>
    window.onload = function(){ window.print(); };
  </script>
</body>
</html>
    `;

    const w = window.open("", "_blank", "width=700,height=800");
    if (!w) {
        alert("Popup blocked. Please allow popups for this site to print.");
        return;
    }
    w.document.open();
    w.document.write(printHtml);
    w.document.close();
}

// ---------- MISC / Optional helpers ----------
function clearLicenseBox(){
    document.getElementById("licenseInput").value = "";
    const box = document.getElementById("infoBox");
    if (box) {
        box.innerHTML = "";
        box.classList.add("hidden");
    }
    clearError();
}

// Expose for console debugging if desired
window.lookupLicense = lookupLicense;
window.openEditViolation = openEditViolation;
window.deleteViolation = deleteViolation;
window.printViolation = printViolation;
