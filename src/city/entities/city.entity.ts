import { AddressEntity } from "src/address/entities/address.entity";
import { StateEntity } from "src/state/entities/state.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn} from "typeorm";

@Entity({name: "city"})
export class CityEntity {

    @PrimaryGeneratedColumn("rowid")
    id: number

    @Column({name: "state_id", nullable: false})
    stateId: number;

    @Column({name: "name", nullable: false})
    name: number;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;
    
    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date;

    @OneToMany(() => AddressEntity, (address) => address.city)
    address?: AddressEntity[]

    @ManyToOne(() => StateEntity, (state) => state.cities )
    @JoinColumn({name: "state_id", referencedColumnName: "id"})
    state?: StateEntity

}