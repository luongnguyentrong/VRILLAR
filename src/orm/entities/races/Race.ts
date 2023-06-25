import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('races')
export class Race {
    @PrimaryColumn()
    race_code: string;

    @PrimaryColumn()
    year: number;

    @Column()
    date: Date;

    @Column("text")
    winner: string;

    @Column()
    car: string;

    @Column()
    laps: number;

    @Column()
    time: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}
