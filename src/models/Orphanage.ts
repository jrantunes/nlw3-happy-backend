import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import Image from './Image';

// decorator
@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  opening_hours: string;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  open_on_weekends: boolean;

  // () => model, dado um model, retorna qual que faz o relacionamento inverso
  @OneToMany(() => Image, image => image.orphanage, {
    // ao cadastrar ou atualizar um orfanato o cascade vai automaticamente cadastrar ou atualizar as imagens relacionadas com o orfanato
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'orphanage_id' }) // coluna que armazena o relacionamento / opcional (nome da coluna deve ser em cammelCase)
  images: Image[];
}
