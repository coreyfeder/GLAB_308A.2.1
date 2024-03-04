# Taxonomy of Everything!

Entity                  basic stats
    ↳ Character         add'l stats
        ↳ Adventurer    level, experience
            ↳ Role      modify stats, add ability
        ↳ Enemy         difficulty, treasure
            ↳ Role      modify stats, add ability
    ↳ Companion         carrying capacity, ability

Item
    ↳ Weapon
    ↳ Shield
    ↳ Clothing
    ↳ Jewelry
    ↳ Artifact
    ↳ Consumable

Background
    (complements role)  modify stats, add ability



# OMG SCALE IT BACK

Character           basics: stats, inventory, universal skills
    ↳ Adventurer    level, experience
        ↳ Role      modify stats, add ability
    ↳ Companion         carrying capacity, ability
Item
    ↳ Consumable

## Next Improvements
- Character generators
    - stat randomizers
    - primary stats for roles
- Stats modify attacks
- Differentiate attacks (melee, ranged, magic, psychic, ...)
- Differentiate actions (attack, defend, heal, buff, debuff, ...)
- Implement role-specific actions
- Implement abilities (override combat methods)
- Implement party interactions
