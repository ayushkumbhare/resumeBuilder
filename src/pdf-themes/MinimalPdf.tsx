import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData, StyleOptions } from '../types';

const createStyles = (styles: StyleOptions) => {
  const accentColor = styles.accentColor || '#1A6FC4';
  const bodySize = (styles.bodyFontSize || 9.5) + (styles.globalFontScale || 0);
  const headingSize = (styles.headingSize || 12) + (styles.globalFontScale || 0);
  const nameSize = (styles.nameSize || 22) + (styles.globalFontScale || 0);
  const lineHeight = styles.lineHeight || 1.4;
  const sectionSpacing = (styles.sectionSpacing ?? 10) * 0.5;
  const marginMm = styles.documentMargin || 14;

  return StyleSheet.create({
    page: {
      padding: `${marginMm}mm 18mm`,
      backgroundColor: '#fff',
      fontFamily: 'Helvetica',
      fontSize: bodySize,
      color: '#111',
      lineHeight: lineHeight,
    },
    header: {
      marginBottom: 14,
    },
    name: {
      fontSize: nameSize,
      color: '#111',
      letterSpacing: -0.5,
      marginBottom: 1,
      lineHeight: 1.15,
    },
    headline: {
      fontSize: bodySize,
      color: '#555',
      marginBottom: 4,
      lineHeight: 1.2,
    },
    contactsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 6,
    },
    contactItemWrap: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    contactItemText: {
      color: '#777',
    },
    accentLine: {
      height: 2,
      backgroundColor: accentColor,
      width: '40mm',
    },
    summary: {
      color: '#333',
    },
    section: {
      marginTop: sectionSpacing,
    },
    sectionTitle: {
      fontSize: headingSize,
      fontFamily: 'Helvetica-Bold',
      textTransform: 'uppercase',
      letterSpacing: 1.5,
      color: '#777',
      marginBottom: 6,
      paddingBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
    },
    entry: {
      marginBottom: 7,
    },
    entryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 2,
    },
    entryTitleWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    entryTitle: {
      fontFamily: 'Helvetica-Bold',
      color: '#111',
    },
    entryOrg: {
      color: accentColor,
    },
    sep: {
      color: '#aaa',
      marginHorizontal: 3,
    },
    meta: {
      color: '#777',
    },
    date: {
      color: '#999',
    },
    bullets: {
      paddingLeft: 14,
      marginTop: 2,
    },
    bulletItem: {
      flexDirection: 'row',
      marginBottom: 1.5,
    },
    bulletPoint: {
      width: 10,
    },
    bulletText: {
      flex: 1,
      color: '#333',
    },
    subheadingText: {
      fontFamily: 'Helvetica-Bold',
      marginTop: 2,
      marginBottom: 1,
      color: '#333',
    },
    skillRow: {
      flexDirection: 'row',
      marginBottom: 2,
    },
    skillKey: {
      fontFamily: 'Helvetica-Bold',
      width: '45mm',
      color: '#111',
    },
    skillVal: {
      flex: 1,
      color: '#444',
    }
  });
};

interface MinimalPdfProps {
  data: ResumeData;
  styles: StyleOptions;
}

export function MinimalPdf({ data, styles }: MinimalPdfProps) {
  const s = createStyles(styles);
  const pi = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.name}>{pi.name || 'Your Name'}</Text>
          {pi.headline && <Text style={s.headline}>{pi.headline}</Text>}
          <View style={s.contactsContainer}>
            {['phone', 'email', 'linkedin', 'github', 'website', 'location']
              .filter(f => (pi as any)[f])
              .map((f, i, arr) => (
                <View key={f} style={s.contactItemWrap}>
                  <Text style={s.contactItemText}>{(pi as any)[f]}</Text>
                  {i < arr.length - 1 && <Text style={s.contactItemText}>{'  ·  '}</Text>}
                </View>
              ))}
          </View>
          <View style={s.accentLine} />
        </View>

        {pi.summary && (
          <View style={s.section}>
            <Text style={s.summary}>{pi.summary}</Text>
          </View>
        )}

        {data.experience.filter(e => e.visible).length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Experience</Text>
            {data.experience.filter(e => e.visible).map(exp => (
              <View key={exp.id} style={s.entry}>
                <View style={s.entryHeader}>
                  <View style={s.entryTitleWrap}>
                    <Text style={s.entryTitle}>{exp.title}</Text>
                    {exp.company && (
                      <>
                        <Text style={s.sep}> at </Text>
                        <Text style={s.entryOrg}>{exp.company}</Text>
                      </>
                    )}
                    {exp.location && <Text style={s.meta}>  ({exp.location})</Text>}
                  </View>
                  <Text style={s.date}>{exp.period}</Text>
                </View>
                <View style={s.bullets}>
                  {exp.bullets.filter(b => b.visible).map(b => (
                    b.isSubheading ? (
                      <Text key={b.id} style={s.subheadingText}>{b.text}</Text>
                    ) : (
                      <View key={b.id} style={s.bulletItem}>
                        <Text style={s.bulletPoint}>•</Text>
                        <Text style={s.bulletText}>{b.text}</Text>
                      </View>
                    )
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.projects.filter(p => p.visible).length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Projects</Text>
            {data.projects.filter(p => p.visible).map(proj => (
              <View key={proj.id} style={s.entry}>
                <View style={s.entryHeader}>
                  <View style={s.entryTitleWrap}>
                    <Text style={s.entryTitle}>{proj.title}</Text>
                    {proj.subtitle && (
                      <>
                        <Text style={s.sep}> — </Text>
                        <Text style={s.meta}>{proj.subtitle}</Text>
                      </>
                    )}
                  </View>
                </View>
                <View style={s.bullets}>
                  {proj.bullets.filter(b => b.visible).map(b => (
                    b.isSubheading ? (
                      <Text key={b.id} style={s.subheadingText}>{b.text}</Text>
                    ) : (
                      <View key={b.id} style={s.bulletItem}>
                        <Text style={s.bulletPoint}>•</Text>
                        <Text style={s.bulletText}>{b.text}</Text>
                      </View>
                    )
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.education.filter(e => e.visible).length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Education</Text>
            {data.education.filter(e => e.visible).map(edu => (
              <View key={edu.id} style={s.entry}>
                <View style={s.entryHeader}>
                  <View style={s.entryTitleWrap}>
                    <Text style={s.entryTitle}>{edu.degree}</Text>
                    <Text style={s.sep}>, </Text>
                    <Text style={s.entryOrg}>{edu.institution}</Text>
                  </View>
                  <Text style={s.date}>{edu.period}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {data.skills.filter(sk => sk.visible).length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Skills</Text>
            {data.skills.filter(sk => sk.visible).map(sk => (
              <View key={sk.id} style={s.skillRow}>
                <Text style={s.skillKey}>{sk.category}:</Text>
                <Text style={s.skillVal}>{sk.items}</Text>
              </View>
            ))}
          </View>
        )}

        {data.responsibilities.filter(r => r.visible).length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Responsibility</Text>
            <View style={s.bullets}>
              {data.responsibilities.filter(r => r.visible).map(r => (
                <View key={r.id} style={s.bulletItem}>
                  <Text style={s.bulletPoint}>•</Text>
                  <Text style={s.bulletText}>{r.text}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
