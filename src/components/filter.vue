<template>
  <div>
    <header class="table-header">
      <div class="table-header_col">
        <div class="search-container">
          <input
              type="text"
              v-model="searchTerm"
              @input="filterTableData"
              @focus="showClearIcon = true"
              @blur="showClearIcon = false"
              placeholder="Введите текст для поиска..."
          />
          <i v-if="showClearIcon" class="fa fa-times" @click="clearSearch"></i>
          <i class="fa fa-search"></i>
        </div>
      </div>
      <div class="table-header_col">
        <button class="create-button" @click="createDocument">
          <i class="fa fa-plus"></i> Создать документ
        </button>
      </div>
    </header>

    <div class="table-container">
      <table>
        <thead>
        <tr>
          <th>Checkbox</th>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in filteredData" :key="item.id">
          <td style="width: 60px;">
            <input type="checkbox" v-model="item.checked" style="margin: 0 auto;" />
          </td>
          <td>{{ item.column1 }}</td>
          <td>{{ item.column2 }}</td>
          <td style="width: 130px;">
            <i class="fa fa-times-circle" style="color: #d41616;" @click="deleteRow(item)"></i>
            <i class="fa fa-edit" style="margin-left: 10px;" @click="editRow(item)"></i>
            <i class="fa fa-link" style="margin-left: 10px;" @click="openLink(item)"></i>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps(['isMenuHide', 'isProfileHide']);
const emit = defineEmits(['update-menu', 'update-profile']); // Если нужны события

const tableData = ref([
  { id: 1, checked: false, column1: 'Row 1', column2: 'Icon 1' },
  { id: 2, checked: false, column1: 'Row 2', column2: 'Icon 2' },
  { id: 3, checked: false, column1: 'Row 3', column2: 'Icon 3' },
  { id: 4, checked: false, column1: 'Row 4', column2: 'Icon 4' },
  { id: 5, checked: false, column1: 'Row 5', column2: 'Icon 5' },
  { id: 6, checked: false, column1: 'Row 6', column2: 'Icon 6' },
  { id: 7, checked: false, column1: 'Row 7', column2: 'Icon 7' },
  { id: 8, checked: false, column1: 'Row 8', column2: 'Icon 8' },
  { id: 9, checked: false, column1: 'Row 9', column2: 'Icon 9' },
  { id: 10, checked: false, column1: 'Row 10', column2: 'Icon 10' },
  { id: 11, checked: false, column1: 'Row 11', column2: 'Icon 11' },
  { id: 12, checked: false, column1: 'Row 12', column2: 'Icon 12' },
  { id: 13, checked: false, column1: 'Row 13', column2: 'Icon 13' },
  { id: 14, checked: false, column1: 'Row 14', column2: 'Icon 14' },
  { id: 15, checked: false, column1: 'Row 15', column2: 'Icon 15' },
  { id: 16, checked: false, column1: 'Row 16', column2: 'Icon 16' },
  { id: 17, checked: false, column1: 'Row 17', column2: 'Icon 17' },
  { id: 18, checked: false, column1: 'Row 18', column2: 'Icon 18' },
  { id: 19, checked: false, column1: 'Row 19', column2: 'Icon 19' },
  { id: 20, checked: false, column1: 'Row 20', column2: 'Icon 20' },
]);

const searchTerm = ref('');
const showClearIcon = ref(false);

const filteredData = computed(() => {
  if (!searchTerm.value) return tableData.value;
  return tableData.value.filter((item) =>
      item.column1.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      item.column2.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const clearSearch = () => {
  searchTerm.value = '';
};

const createDocument = () => {
  // Логика создания документа, например, перенаправление на форму
  router.push('/create-document'); // Пример маршрута
};

const deleteRow = (item) => {
  tableData.value = tableData.value.filter((row) => row.id !== item.id);
};

const editRow = (item) => {
  // Логика редактирования, например, открытие модального окна или формы
  console.log('Edit row:', item);
};

const openLink = (item) => {
  // Логика открытия ссылки, например, переход по URL
  console.log('Open link for:', item);
};
</script>

<style scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: #f5f7fa;
  border-bottom: 1px solid #e0e0e0;
}

.table-header_col {
  display: flex;
  align-items: center;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-container input {
  padding: 8px 30px 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
}

.search-container i {
  position: absolute;
  right: 10px;
  color: #666;
  cursor: pointer;
}

.search-container .fa-times {
  right: 30px;
}

.create-button {
  padding: 8px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.create-button:hover {
  background: #0056b3;
}

.table-container {
  overflow-x: auto;
  margin: 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f8f9fa;
  font-weight: 600;
}

td i {
  cursor: pointer;
  transition: color 0.3s;
}

td i:hover {
  color: #007bff;
}

@media (max-width: 768px) {
  .table-header {
    flex-direction: column;
    gap: 10px;
  }
  .search-container input {
    width: 100%;
  }
  table {
    font-size: 12px;
  }
}
</style>