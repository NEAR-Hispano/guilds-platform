use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, env, setup_alloc, AccountId};
use near_sdk::serde::{Serialize, Deserialize};
use near_sdk::collections::UnorderedMap;
use std::collections::HashSet;
use std::convert::From;
use serde_json::json;

setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct GuildsPlatform {
    guilds: UnorderedMap<String, UpgradableGuild>,
    users: UnorderedMap<AccountId, HashSet<String>>
}

//Initializing the contract
impl Default for GuildsPlatform {
    fn default() -> Self {
      Self {
        guilds: UnorderedMap::new(b"g".to_vec()),
        users: UnorderedMap::new(b"u".to_vec())
      }
    }
  }

/// Default trait for Guild
impl Default for Guild {
    fn default() -> Self {
        new_guild()
    }
}

/// Default trait for UpgradableGuild
impl Default for UpgradableGuild {
    fn default() -> Self {
        UpgradableGuild::CurrentVersion(new_guild())
    }
}

//Implementation for upgradable contract
#[derive(Serialize, Deserialize, BorshSerialize, BorshDeserialize, Debug)]
#[serde(crate = "near_sdk::serde")]
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

#[derive(Serialize, Deserialize, BorshSerialize, BorshDeserialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Guild {
    pub slug: String,
    pub members: HashSet<AccountId>,
}

#[near_bindgen]
impl GuildsPlatform {
    pub fn create_guild(&mut self, slug: String)
    {
        match self.guilds.get(&slug){
            Some(_value) => {
                self.create_log("error","create_guild",&slug,"The guild already exists.");
            },
            None => {
                let guild = UpgradableGuild::CurrentVersion(Guild {
                    slug: String::from(&slug),
                    members: HashSet::new(),
                });
        
                self.guilds.insert(&slug, &guild);
                self.create_log("success","create_guild",&slug,"A new guild was created.");
            }
        }
    }

    pub fn get_guild_info(&self, slug: String) -> Guild {
        let guild: Guild = self.guilds.get(&slug).unwrap_or_default().into();

        return guild
    }

    pub fn join_guild(&mut self, slug: String) {

        if self.guild_exists(&slug){
            let mut guild: Guild = self.guilds.get(&slug).unwrap_or_default().into();
            let account_to_insert = env::predecessor_account_id();

            if guild.members.get(&account_to_insert).is_none() {
                guild.members.insert(String::from(&account_to_insert));
                self.guilds.insert(&slug,&UpgradableGuild::CurrentVersion(guild));

                let mut user_list: HashSet<AccountId>;
                match self.check_if_user(){
                    true => {
                        user_list = self.users.get(&env::predecessor_account_id()).unwrap_or_default();
                    },
                    false => {
                        user_list = HashSet::new();
                    }
                };
    
                user_list.insert(slug.to_string());
                self.users.insert(&env::predecessor_account_id(),&user_list);
                
                self.create_log("success","join_guild",&slug,"The user joined a guild successfully.");
            }
            else{
                self.create_log("error","join_guild",&slug,"The was already member of the guild.");
            }
        }

    }

    pub fn get_num_members(&self, slug: String) -> usize {
        let guild: Guild = self.guilds.get(&slug).unwrap_or_default().into();

        guild.members.len()
    }

    /// Returns true if the guild exists
    pub fn guild_exists(&self, slug: &String) ->bool {
        match self.guilds.get(&slug) {
            Some(_value) => {
                self.create_log("success","guild_exists",&slug,"The guild exists.");
                true
            },
            None => {
                self.create_log("error","guild_exists",&slug,"The guild doesn't exist.");
                false
            }
        }
    }

    /// Returns true if the current account is member of the Guild
    pub fn check_if_member(&self, slug: String) -> bool {
        let guild: Guild;
        match self.guild_exists(&slug) {
            true => guild = self.guilds.get(&slug).unwrap_or_default().into(),
            false => {
                return false;
            }
        }

        match guild.members.get(&env::predecessor_account_id()) {
            Some(_member) => true,
            None => false,
        }
    }

    pub fn get_member_list(&self, slug: String) -> HashSet<AccountId> {
        let guild: Guild;
        match self.guild_exists(&slug) {
            true => {
                guild = self.guilds.get(&slug).unwrap_or_default().into();
                return guild.members;
            },
            false => {
                self.create_log("error","get_member_list",&slug,"The guild doesn't exist.");
                return HashSet::<AccountId>::new();
            }
        };
    }
    
    //Checks if the current user is already registered in our platform
    pub fn check_if_user(&self) -> bool {
        match self.users.get(&env::predecessor_account_id()) {
            Some(_user) => true,
            None => {
                self.create_log("error","check_if_user","none","The user is not part of any guild.");
                false
            },
        }
    }

    //Gets the list of guilds a user is part of
    pub fn get_guilds_by_user(&self) -> HashSet<String> {
        match self.check_if_user() {
            true => {
                self.users.get(&env::predecessor_account_id()).unwrap_or_default()
            },
            false => {
                HashSet::<String>::new()
            },
        }
    }

    fn create_log(&self, result: &str, method: &str, slug: &str, msg: &str){
        let log_msg = json!({
            "result": &result,
            "method": &method,
            "guild": &slug,
            "user": env::predecessor_account_id(),
            "date": env::block_timestamp(),
            "message": msg
        });
        env::log(format!("{}",log_msg.to_string()).as_bytes());
    }
}

/// Returns an empty Guild
pub fn new_guild() -> Guild {
    Guild {
        slug: String::from(""),
        members: HashSet::new(),
    }
}
