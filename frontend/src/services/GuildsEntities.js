export const GuildsEntities = async() => {
    const response = await fetch('https://raw.githubusercontent.com/near/ecosystem/main/entities.json');
    const data = await response.json();
    return data;
}

//TODO: Proposal to show only some guilds by slug
export const filterGuilds = (data) => {
    const guilds = [
        "near-music-guild",
        "near-vietnam",
        "NEAR-RU",
        "human-guild",
    ]

    const list = guilds.map(element => data.find(item => element === item.slug));
    return list;
}