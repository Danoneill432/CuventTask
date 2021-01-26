export function inviteValidator(inviteCode) {
    if (!inviteCode || inviteCode.length < 5) return "Invite code can't be empty."
    return ''
}
