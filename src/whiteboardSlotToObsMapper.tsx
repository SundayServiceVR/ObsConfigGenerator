// deno-lint-ignore no-explicit-any
export function mapWhiteboardSlotToObsSlot(slot: any) {
    const returnSlot = { ...slot };

    if(returnSlot.slotType === "TWITCH") {
        returnSlot.mediaSourceUrl = `https://twitch.tv/${slot.twitchUserName}/embed?frameborder="0"`
    }

    return returnSlot;
}