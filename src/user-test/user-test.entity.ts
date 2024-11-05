import { NoteTest } from 'src/note-test/note-test.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => NoteTest, (noteTest) => noteTest.userTest)
  noteTest: NoteTest[];
}
