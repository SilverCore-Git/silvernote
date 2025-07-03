<template>
    <div>
        <SignedIn>
            <UserProfile />
        </SignedIn>
        <SignedOut>
            <SignIn />
        </SignedOut>
    </div>
</template>

<script lang="ts" setup>

import { SignedIn, SignIn, SignedOut, UserProfile } from '@clerk/vue';

</script>