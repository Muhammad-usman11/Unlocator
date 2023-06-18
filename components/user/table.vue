<template>
    <table id="dataTable" class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
        <tr>
            <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6" data-priority="4">
                ID
            </th>
            <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" data-priority="1">Name</th>
            <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" data-priority="3">Email</th>
            <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" data-priority="2">Actions</th>
        </tr>
        </thead>
    </table>
</template>

<script setup>
import 'datatables.net-dt/js/dataTables.dataTables'
import $ from 'jquery'
import useCustomFetch from "~/composables/useCustomFetch";

let table = null;

onUnmounted(() => {
    table.destroy();
});

onMounted(() => {
    table = $('#dataTable').DataTable({
        serverSide: true,
        processing: true,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        ajax: async (data, callback) => {
            const response = await useCustomFetch('/admin/user', {
                query: toQueryObject(data)
            }).then(response => {
                callback(response);
                return response
            });
        },
        pagingType: 'full_numbers',
        language: {
            paginate: {
                first: '<i class="fa-solid fa-backward-fast" aria-hidden="true"></i>',
                previous: '<i class="fa-solid fa-backward-step" aria-hidden="true"></i>',
                next: '<i class="fa-solid fa-forward-step large" aria-hidden="true"></i>',
                last: '<i class="fa-solid fa-forward-fast" aria-hidden="true"></i>'
            }
        },
        columns: [
            {data: 'id', name: "id"},
            {data: 'name', name: "name"},
            {data: 'email', name: "email"},
            {
                data: function (data) {
                    let disabled = data.disabled;
                    let actions = data.actions.split(',')
                    let buttons = '<div class="row">';
                    if (actions.includes('view')) {
                        buttons += '<button class="inline-flex ml-2 items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 view-edit-btn" data-id="' + data.id + '">View</button>'
                    }
                    if (actions.includes('edit')) {
                        buttons += '<button class="inline-flex ml-2 items-center rounded-md border border-transparent bg-amber-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 user-edit-btn" data-id="' + data.id + '">Edit</button>'
                    }
                    if (actions.includes('disable') && disabled == null) {
                        buttons += '<button class="inline-flex ml-2 items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 user-disable-btn" data-id="' + data.id + '">Disable</button>'
                    } else if (actions.includes('enable') && disabled != null) {
                        buttons += '<button class="inline-flex ml-2 items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 user-enable-btn" data-id="' + data.id + '">Enable</button>'
                    }
                    buttons += '</div>'
                    return buttons;
                }, name: 'actions', orderable: false
            },
        ],
        responsive: true
    });

    $(document).ready(() => {
        $(document).on('click', '.view-edit-btn', (e) => {
            e.preventDefault();
            let id = e.target.getAttribute('data-id');
            navigateTo({
                path: `/admin/user/${id}`
            });
        }).on('click', '.user-edit-btn', (e) => {
            e.preventDefault();
            let id = e.target.getAttribute('data-id');
            navigateTo({
                path: `/admin/user/${id}/edit`
            });
        }).on('click', '.user-disable-btn', (e) => {
            e.preventDefault();
            let id = e.target.getAttribute('data-id');
            useCustomFetch(`/admin/user/${id}/disable`, {
                method: 'POST'
            }).then(() => {
                table.ajax.reload();
            });
        }).on('click', '.user-enable-btn', (e) => {
            e.preventDefault();
            let id = e.target.getAttribute('data-id');
            useCustomFetch(`/admin/user/${id}/enable`, {
                method: 'POST'
            }).then(() => {
                table.ajax.reload();
            });
        });
    });
});

const toQueryObject = (data, nested = null) => {
    let result = {};
    for (const key in data) {
        let value = data[key];
        if (["string", "number", "boolean"].includes((typeof value).toLowerCase())) {
            let temp = {};
            if (nested) {
                let temp_key = nested + "[" + key + "]";
                // @ts-ignore
                temp[temp_key] = value;
            } else {
                // @ts-ignore
                temp[key] = value;
            }
            result = {...result, ...temp};
        } else {
            let temp_key = key;
            if (nested) {
                temp_key = nested + "[" + key + "]";
            }
            let temp = toQueryObject(value, temp_key);
            result = {...result, ...temp};
        }
    }
    return result;
}
</script>

<style scoped>

</style>
