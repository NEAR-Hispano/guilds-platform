use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, env, setup_alloc, AccountId};
// use near_sdk::serde::{Serialize, Deserialize};
use near_sdk::collections::{UnorderedMap, UnorderedSet};
// use std::collections::HashSet;
// use std::vec::Vec;
use std::convert::From;

setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct GuildsPlatform {
    guilds: UnorderedMap<String, UpgradableGuild>,
    users: UnorderedMap<AccountId, UnorderedSet<String>>
}

impl Default for GuildsPlatform {
    fn default() -> Self {
        Self {
        guilds: UnorderedMap::new(b"g".to_vec()),
        users: UnorderedMap::new(b"u".to_vec())
        }
    }
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct Guild {
    pub slug: String,
    pub members: UnorderedSet<AccountId>,
}

/// Default trait for Guild
impl Default for Guild {
    fn default() -> Self {
        new_guild()
    }
}

pub fn new_guild() -> Guild {
    env::log(format!("Emplty guild created").as_bytes());
    Guild {
        slug: String::from(""),
        members: UnorderedSet::new(b"n".to_vec()),
    }
}

#[near_bindgen]
impl GuildsPlatform {
    pub fn create_guild(&mut self, slug: String){
        //Creates a guild based on the current version
        let guild = UpgradableGuild::CurrentVersion(Guild {
            slug: String::from(&slug),
            members: UnorderedSet::new(slug.as_bytes().to_vec()),
        });

        self.guilds.insert(&slug, &guild);

        env::log(format!("Saving guild '{}'", &slug,).as_bytes());
    }

    // pub fn get_guild_info(&self, slug: String) -> Guild {
    //     let guild = self.guilds.get(&slug).unwrap_or_default().into();

    //     return guild
    // }

    pub fn guild_exists(&self, slug: &String) ->bool {
        match self.guilds.get(&slug) {
            Some(_value) => {
                true
            },
            None => false
        }
    }
}

//Implementation for upgradable contract
#[derive(BorshSerialize, BorshDeserialize)]
pub enum UpgradableGuild {
    CurrentVersion(Guild),
}

impl From<UpgradableGuild> for Guild {
    fn from(guild: UpgradableGuild) -> Self {
        match guild {
            UpgradableGuild::CurrentVersion(guild) => guild,  
        }
    }
}
