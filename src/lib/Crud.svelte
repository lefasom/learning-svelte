<!-- Crud.svelte -->
<script>
  import {
    getDocs,
    collection,
    doc,
    deleteDoc,
    addDoc,
    updateDoc,
    getDoc,
    query,
    orderBy,
    onSnapshot,
  } from "firebase/firestore";
  import { db } from "../../firebase.js";

  let items = [];
  let newItem = "";
  let editingItem = null;

  async function loadItems() {
    const notificationRef = collection(db, "anime");
    getDocs(notificationRef)
      .then((querySnapshot) => {
        items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      })
      .catch((error) => {
        console.error("Error obteniendo notificaciones: ", error)
      })
  }

  async function addItem() {
    if (newItem.trim() !== "") {
      await addDoc(collection(db, "anime"), { text: newItem })
      newItem = ""
      loadItems()
    }
  }

  async function editItem(id) {
    editingItem = id
  }

  async function saveItem(item) {
    const usuarioRef = doc(db, "anime", item.id) // Reemplaza 'usuarios' por el nombre de tu colección
    updateDoc(usuarioRef, { text: item.text})
    editingItem = null
  }

  async function deleteItem(id) {
    await deleteDoc(doc(db, "anime", id))
    loadItems()
  }
  loadItems()
</script>

<div>

  <div>
    <input bind:value={newItem} placeholder="Nuevo ítem" />
    <button on:click={addItem}>Agregar</button>
  </div>

  <ul>
    {#each items as item (item.id)}
      <li>
        {#if editingItem === item.id}
          <div>
            <input bind:value={item.text} />
            <button on:click={() => saveItem(item)}>Guardar</button>
          </div>
        {/if}
        {#if editingItem !== item.id}
          <div>
            <span>{item.text}</span>
            <button on:click={() => editItem(item.id)}>Editar</button>
            <button on:click={() => deleteItem(item.id)}>Eliminar</button>
          </div>
        {/if}
      </li>
    {/each}
  </ul>
</div>
