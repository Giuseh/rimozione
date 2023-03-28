exports.checkPermissions = (member, permissions) => {
    for (let i = 0; i < permissions.length; i++)
        if (member.roles.cache.find(r => r.id === permissions[i])) return true;

    return false;
}

exports.ServerPermissions = {
    TIROCINANTE: CONFIG.discordRoles.TIROCINANTE,
    AUTISTA: CONFIG.discordRoles.AUTISTA,
    ESPERTO: CONFIG.discordRoles.ESPERTO,
    KEY: CONFIG.discordRoles.KEY,
    RIMO: CONFIG.discordRoles.RIMO
}