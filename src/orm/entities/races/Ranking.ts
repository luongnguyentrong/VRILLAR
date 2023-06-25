import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('rankings')
export class Ranking {
    @PrimaryColumn()
    race_code: string;

    @Column()
    pos: string;

    @Column()
    no: number;

    @PrimaryColumn("text")
    driver: string;

    @Column({
        name: "time/retired"
    })
    time: string;

    @Column()
    car: string;

    @Column()
    laps: number;

    @Column()
    pts: number;

    @PrimaryColumn()
    year: number;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}
