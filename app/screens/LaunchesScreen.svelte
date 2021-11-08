<page>
    <actionBar title="Launches" />
    <pullToRefresh bind:this={ptr} on:refresh={onPullToRefresh}>
        <listView items="{listOfItems}" on:itemTap="{onItemTap}">
            <Template let:item>
                <!-- Shows the list item label in the default color and style. -->
                <label text="{item.mission_name}" />
            </Template>
        </listView>
    </pullToRefresh>
</page>


<script lang="ts">
    import {Template} from 'svelte-native/components'
    import {dataSource} from '~/services'
    import {Launch} from "../dto";
    import {PullToRefresh} from "@nativescript-community/ui-pulltorefresh";
    import {NativeElementNode} from "svelte-native/dom";

    let ptr: NativeElementNode<PullToRefresh>;
    let listOfItems: Launch[] = [];

    async function load() {
        listOfItems = await dataSource.getLaunches();
    }

    load();

    async function onPullToRefresh() {
        let e: Error | null = null;

        try {
            await dataSource.invalidateLaunches();
            await load();
        } catch (ex) {
            e = ex;
        } finally {
            ptr.nativeElement.refreshing = false;
            if (e) {
                alert(e.toString());
            }
        }
    }

    async function onItemTap({ index }) {
        alert(listOfItems[index].mission_name);
    }
</script>

<style>
</style>
