<!--
MIT License

Copyright (c) 2020 Paul Schwind

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
-->
<script lang="ts">
  import Sortable from "sortablejs";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // every item is an object with a unique ID for identification
  export let items = [];
  export let idKey = "id"; // id attribute changeable if needed
  export let ulClass = "";
  export let liClass: string | Function = "";
  export let getItemById = undefined;
  export let sortableOptions: any = {};
  sortableOptions = Object.assign({}, sortableOptions); // prevent leak to outside
  if (sortableOptions.dataIdAttr)
    throw new Error("sortableOptions.dataIdAttr is currently not supported.");
  if (!sortableOptions.store) {
    sortableOptions.store = {
      set: (sortable) => undefined, // placeholder
    };
  }
  if (sortableOptions.group && !getItemById) {
    throw new Error(
      "When using group, please provide a function called `getItemById` (as a prop) that gives an item in case it gets dropped from somewhere else. Otherwise, the SortableList cannot know what the item is exactly."
    );
  }
  getItemById =
    getItemById ||
    ((id) => {
      return items.find((item) => item[idKey] == id); // should only loosely check as IDs are auto-converted to strings
    });
  let _store_set = sortableOptions.store.set;
  sortableOptions.store.set = (sortable) => {
    items = sortable.toArray().map(getItemById);
    _store_set(sortable); // still call old set callback function
    dispatch("change", items);
  };

  let sortable: Sortable;
  let listElement: HTMLElement;
  $: if (listElement && !sortable) {
    sortable = Sortable.create(listElement, sortableOptions);
  }
  $: for (let item of items) {
    if (!item || item[idKey] == null) {
      throw new Error("Item " + item + " has no valid identifier " + idKey);
    }
  }
</script>

<ul bind:this={listElement} class={ulClass}>
  {#each items as item, index (item[idKey])}
    <li
      class={typeof liClass === "function" ? liClass(item) : liClass}
      data-id={item[idKey]}
    >
      <slot {item} {index}>{item}</slot>
    </li>
  {/each}
</ul>
