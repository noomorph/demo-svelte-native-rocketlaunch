<page>
    <actionBar title={item.mission_name} />
    <stackLayout>
        <image class="preview" src={thumbnailUrl} height="200" verticalAlignment="center" />
    </stackLayout>
</page>


<script lang="ts">
    import {Launch} from '../dto';

    export let item: Launch;
    const thumbnailUrl = item.links.flickr_images[0];
</script>

<style>
    .preview {
        background-color: silver;
    }
</style>
