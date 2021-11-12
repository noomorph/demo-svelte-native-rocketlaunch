<page>
    <actionBar title="Launches" />
    <pullToRefresh bind:this={ptr} on:refresh={onPullToRefresh}>
        <listView items="{listOfItems}" on:itemTap="{onItemTap}">
            <Template let:item>
                <!-- Shows the list item label in the default color and style. -->
                <stackLayout orientation="horizontal">
                    <image class="preview" src={item.links.flickr_images[0]} width="30" height="30" stretch="aspectFit" />
                    <label text="{item.mission_name}" />
                </stackLayout>
            </Template>
        </listView>
    </pullToRefresh>
</page>


<script lang="ts">
    import {Template} from 'svelte-native/components'
    import {dataSource} from '~/services'
    import {Launch} from "../dto";
    import {PullToRefresh} from "@nativescript-community/ui-pulltorefresh";
    import {NativeElementNode, navigate} from "svelte-native/dom";
    import DetailsScreen from "./DetailsScreen.svelte";

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
        const item = listOfItems[index];
        navigate({
            page: DetailsScreen,
            props: { item }
        });
    }
</script>

<style>
    .preview {
        background-color: silver;
    }
</style>
