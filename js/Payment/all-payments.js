async function fetchFormattedPayments() {
    try {
        const response = await fetch('https://crm-edu-center.fn1.uz/api/payments/get-all-payments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch payments');
        }

        const paymentsData = await response.json();
        const formattedPayments = paymentsData.map(item => ({
            Id: item.id,
            StudentId: item.student.lastName + ' ' + item.student.firstName,
            GroupId: item.student.guruh.groupName,
            Paid: item.qanchaTolagan,
            WhenPaid: formatDateTime(item.qachonTolagan),
        }));
        return formattedPayments;
    } catch (error) {
        console.error('Error fetching and formatting payments:', error);
        return null;
    }
}

function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Tashkent',
    };
    return dateTime.toLocaleString('uz-UZ', options);
}

async function displayFormattedPayments() {
    const formattedPayments = await fetchFormattedPayments();
    if (formattedPayments) {
        const table = $('#payments1').DataTable({
            destroy: true,
            columns: [
                { data: 'StudentId' },
                { data: 'GroupId' },
                { data: 'Paid' },
                { data: 'WhenPaid' }
            ]
        });

        table.clear().draw();
        formattedPayments.forEach(payment => {
            table.row.add(payment);
        });

        table.draw(); 
    } else {
        console.log('Failed to fetch and format payments');
    }
}

displayFormattedPayments();