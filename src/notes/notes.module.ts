import { Module } from "@nestjs/common";
import { NotesController } from "./notes.controller";
import { NoteService } from "./notes.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Note } from "./notes.model";

@Module({
	controllers: [NotesController],
	providers: [NoteService],
	imports: [
		SequelizeModule.forFeature([Note])
	]
})

export class NotesModule {}